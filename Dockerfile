FROM alpine/curl AS download-command-line-tools
WORKDIR /w
RUN curl --fail -sSL https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -o commandlinetools.zip && unzip commandlinetools.zip

FROM eclipse-temurin:21-jdk AS android-sdk
ENV ANDROID_SDK_ROOT=/opt/android-sdk
COPY --from=download-command-line-tools /w/cmdline-tools /opt/android-sdk/cmdline-tools/latest
RUN yes | /opt/android-sdk/cmdline-tools/latest/bin/sdkmanager --install \
  "platform-tools" \
  "build-tools;34.0.0" \
  "platforms;android-34" \
  "ndk;25.1.8937393" \
  "ndk;26.1.10909125" \
  "ndk;26.3.11579264" \
  "cmake;3.22.1"

FROM eclipse-temurin:21-jdk AS volta
USER ubuntu
ENV VOLTA_HOME=/home/ubuntu/.volta
ENV PATH=$VOLTA_HOME/bin:$PATH
RUN curl https://get.volta.sh | bash
RUN volta install node@latest npm@latest

FROM eclipse-temurin:21-jdk AS prebuild3
COPY --from=volta --chown=ubuntu:ubuntu /home/ubuntu/.volta /home/ubuntu/.volta
USER ubuntu
ENV VOLTA_HOME=/home/ubuntu/.volta
ENV PATH=$VOLTA_HOME/bin:$PATH
COPY --chown=ubuntu:ubuntu ./ /home/ubuntu/work/
WORKDIR /home/ubuntu/work/
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 npm ci
WORKDIR /home/ubuntu/work/packages/my-app
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 \
  --mount=type=secret,id=google-services-json,uid=1000,gid=1000 \
  --mount=type=tmpfs,target=/tmp \
  npx expo prebuild --platform all

FROM builder AS prebuild23
COPY --chown=ubuntu:ubuntu ./ /home/ubuntu/work/
WORKDIR /home/ubuntu/work/
RUN ls -la .
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 npm ci
WORKDIR /home/ubuntu/work/packages/my-app
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 --mount=type=tmpfs,target=/tmp npx expo prebuild --platform all

FROM eclipse-temurin:21-jdk AS builder
RUN --mount=type=cache,target=/var/lib/apt/lists apt-get update \
  && apt-get install -y --no-install-recommends \
    ninja-build
COPY --from=volta --chown=ubuntu:ubuntu /home/ubuntu/.volta /home/ubuntu/.volta
COPY --from=android-sdk /opt/android-sdk/ /opt/android-sdk/
USER ubuntu
ENV VOLTA_HOME=/home/ubuntu/.volta
ENV PATH=$VOLTA_HOME/bin:$ANDROID_SDK_ROOT/platform-tools/latest/bin:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH

FROM builder AS prebuild2
COPY --chown=ubuntu:ubuntu ./ /home/ubuntu/work/
WORKDIR /home/ubuntu/work/
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 npm ci
WORKDIR /home/ubuntu/work/packages/my-app
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 --mount=type=tmpfs,target=/tmp npx expo prebuild --platform all

FROM domjtalbot/volta:latest AS prebuild
RUN volta install node
WORKDIR /w/
COPY ./ /w/
RUN --mount=type=cache,target=/root/.npm npm ci && npm remove expo-dev-client
WORKDIR /w/packages/my-app
RUN --mount=type=cache,target=/root/.npm --mount=type=tmpfs,target=/tmp volta run npx expo prebuild --platform all

FROM cimg/android:2024.08-node AS cimg
RUN --mount=type=cache,target=/home/circleci/android-sdk/cache sdkmanager --install "platform-tools" "build-tools;34.0.0" "platforms;android-34" "ndk;25.1.8937393" "ndk;26.1.10909125" "ndk;26.3.11579264"
# USER root
RUN --mount=type=cache,target=/var/lib/apt/lists sudo apt-get update \
  && sudo apt-get install -y --no-install-recommends \
    ninja-build
# #
COPY --from=prebuild --chown=circleci:circleci /w/ /home/circleci/project/
WORKDIR /home/circleci/project/packages/my-app/android
# RUN npx expo run:android
ENV GRADLE_OPTS="-Xmx4g -Dorg.gradle.daemon=false -Dorg.gradle.parallel=true"

ENV EXPO_PUBLIC_APP_ID="com.trajano.myapp"
ENV EXPO_PUBLIC_APP_NAME="My App"
RUN \
  --mount=type=cache,target=/home/circleci/project/.gradle/wrapper/dists \
  --mount=type=cache,target=/home/circleci/project/.gradle/caches/modules-2/files-2.1,sharing=private \
  --mount=type=cache,target=/home/circleci/project/.gradle/caches/modules-2/metadata-2.106,sharing=private \
  ./gradlew assembleDebug assembleRelease
# Output file is in /home/circleci/project/packages/my-app/android/app/build/outputs/apk/debug/app-debug.apk
# docker cp $(command docker run -d $( docker build -q . )):/home/circleci/project/packages/my-app/android/app/build/outputs/apk/debug/app-debug.apk app-debug.apk
# docker cp $(command docker run -d $( docker build -q . )):/home/circleci/project/packages/my-app/android/app/build/outputs/apk/release/app-release.apk app-release.apk

# RUN --mount=type=cache,target=/home/circleci/.gradle/wrapper/dists \
#   ./gradlew assembleDebug

FROM eclipse-temurin:21-jdk AS builder2
RUN --mount=type=cache,target=/var/lib/apt/lists apt-get update \
  && apt-get install -y --no-install-recommends \
    ninja-build
COPY --from=volta --chown=ubuntu:ubuntu /home/ubuntu/.volta /home/ubuntu/.volta
COPY --from=android-sdk /opt/android-sdk/ /opt/android-sdk/
USER ubuntu
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV VOLTA_HOME=/home/ubuntu/.volta
ENV PATH=$VOLTA_HOME/bin:$ANDROID_SDK_ROOT/platform-tools/latest/bin:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH
COPY --from=prebuild3 --chown=ubuntu:ubuntu /home/ubuntu/work/ /home/ubuntu/work/
WORKDIR /home/ubuntu/.gradle
WORKDIR /home/ubuntu/work/packages/my-app/android
# RUN npx expo run:android
ENV JAVA_OPTS="-Xmx4g -Dorg.gradle.daemon=false -Dorg.gradle.parallel=true"

FROM builder2 AS devclient
RUN \
  --mount=type=cache,target=/home/ubuntu/.gradle/wrapper/dists,uid=1000,gid=1000 \
  --mount=type=cache,target=/home/ubuntu/.gradle/caches,sharing=private,uid=1000,gid=1000 \
  ./gradlew assembleDebug

FROM builder2 AS previewApk
ENV EXPO_PUBLIC_APP_ID="com.trajano.myapp"
ENV EXPO_PUBLIC_APP_NAME="My App"
RUN \
  --mount=type=cache,target=/home/ubuntu/.gradle/wrapper/dists,uid=1000,gid=1000 \
  --mount=type=cache,target=/home/ubuntu/.gradle/caches,sharing=private,uid=1000,gid=1000 \
  ./gradlew assembleRelease

FROM busybox
COPY --from=devclient /home/ubuntu/work/packages/my-app/android/app/build/outputs/apk/debug/app-debug.apk /app-debug.apk
COPY --from=previewApk /home/ubuntu/work/packages/my-app/android/app/build/outputs/apk/release/app-release.apk /app-release.apk
