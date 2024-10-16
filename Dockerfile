# syntax=docker/dockerfile:1

# Stage 1: Download Android command-line tools (build platform-specific)
FROM --platform=$BUILDPLATFORM busybox:stable AS download-tools
ADD https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip /w/commandlinetools.zip
WORKDIR /w
RUN unzip commandlinetools.zip

# Stage 2: Setup Android SDK (build platform-specific)
FROM --platform=$BUILDPLATFORM eclipse-temurin:21-jdk AS android-sdk
ENV ANDROID_SDK_ROOT=/opt/android-sdk
COPY --from=download-tools --chmod=644 /w/cmdline-tools /opt/android-sdk/cmdline-tools/latest
COPY --from=download-tools --chmod=755 /w/cmdline-tools/bin/* /opt/android-sdk/cmdline-tools/latest/bin/
RUN --mount=type=cache,target=/root/.android/cache \
  yes | /opt/android-sdk/cmdline-tools/latest/bin/sdkmanager --install \
  "platform-tools" \
  "build-tools;34.0.0" \
  "platforms;android-34" \
  "ndk;25.1.8937393" \
  "ndk;26.1.10909125" \
  "ndk;26.3.11579264" \
  "cmake;3.22.1" \
  && yes | /opt/android-sdk/cmdline-tools/latest/bin/sdkmanager --licenses
# "system-images;android-34;google_apis;x86_64" \
# "emulator" \

# Stage 3: Install Volta, Node.js and EAS-CLI (build platform-specific)
FROM --platform=$BUILDPLATFORM eclipse-temurin:21-jdk AS volta
USER ubuntu
ENV VOLTA_HOME=/home/ubuntu/.volta
ENV PATH=$VOLTA_HOME/bin:$PATH
RUN curl https://get.volta.sh | bash \
  && volta install node@latest npm@latest \
  && npm i -g eas-cli@latest

# Stage 4: Prepare Environment for Prebuild (build platform-specific)
FROM --platform=$BUILDPLATFORM eclipse-temurin:21-jdk AS prebuild-env
COPY --from=volta --chown=ubuntu:ubuntu --chmod=700 /home/ubuntu/.volta /home/ubuntu/.volta
USER ubuntu
ENV VOLTA_HOME=/home/ubuntu/.volta
ENV PATH=$VOLTA_HOME/bin:$PATH
COPY --chown=ubuntu:ubuntu ./ /home/ubuntu/work/
WORKDIR /home/ubuntu/work/
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 npm ci
WORKDIR /home/ubuntu/work/packages/my-app

# Stage 5: Prebuild Dev Client (build platform-specific)
FROM prebuild-env AS prebuild-devclient
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 \
  --mount=type=secret,id=google-services-json,target=/home/ubuntu/work/google-services.json,uid=1000,gid=1000 \
  --mount=type=tmpfs,target=/tmp \
  npx expo prebuild --platform all --no-install

# Stage 6: Prebuild Preview (build platform-specific)
FROM prebuild-env AS prebuild-preview
ENV EXPO_PUBLIC_APP_ID="net.trajano.myapp"
ENV EXPO_PUBLIC_APP_NAME="My App"
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 \
  --mount=type=secret,id=google-services-json,target=/home/ubuntu/work/google-services.json,uid=1000,gid=1000 \
  --mount=type=tmpfs,target=/tmp \
  npx expo prebuild --platform all --no-install

# Stage 7: Prepare Environment for Gradle APK Build (build platform-specific)
FROM --platform=$BUILDPLATFORM eclipse-temurin:21-jdk AS gradle-build-env
RUN --mount=type=cache,target=/var/lib/apt/lists apt-get update \
  && apt-get install -y --no-install-recommends ninja-build
COPY --from=volta --chown=ubuntu:ubuntu /home/ubuntu/.volta /home/ubuntu/.volta
COPY --from=android-sdk /opt/android-sdk/ /opt/android-sdk/
USER ubuntu
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV VOLTA_HOME=/home/ubuntu/.volta
ENV PATH=$VOLTA_HOME/bin:$ANDROID_SDK_ROOT/platform-tools/latest/bin:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH
WORKDIR /home/ubuntu/.gradle
WORKDIR /home/ubuntu/work/packages/my-app/android
ENV JAVA_OPTS="-Xmx4g -Dorg.gradle.daemon=false -Dorg.gradle.parallel=true -Dorg.gradle.caching=true"

# Stage 8: Build Dev Client APK (build platform-specific)
FROM gradle-build-env AS devclient
COPY --from=prebuild-devclient --chown=ubuntu:ubuntu /home/ubuntu/work/ /home/ubuntu/work/
RUN --mount=type=cache,id=assembleDebug,target=/home/ubuntu/.gradle,uid=1000,gid=1000 \
  ./gradlew assembleDebug

# Stage 9: Build Preview APKs (build platform-specific)
FROM gradle-build-env AS preview-apk
COPY --from=prebuild-preview --chown=ubuntu:ubuntu /home/ubuntu/work/ /home/ubuntu/work/
RUN --mount=type=cache,id=assembleRelease,target=/home/ubuntu/.gradle,uid=1000,gid=1000 \
  ./gradlew assembleRelease

# EAS iOS build
FROM prebuild-env AS eas-build-ios-devclient
ENV EAS_NO_VCS=1
ENV EAS_PROJECT_ROOT=/home/ubuntu/work
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 \
  --mount=type=secret,id=EXPO_TOKEN,env=EXPO_TOKEN \
  --mount=type=secret,id=eas-credentials-json,target=/home/ubuntu/work/packages/my-app/credentials.json,uid=1000,gid=1000 \
  --mount=type=tmpfs,target=/home/ubuntu/work/packages/my-app/credentials \
  eas build --non-interactive --platform=ios --profile=development

FROM prebuild-env AS eas-build
ENV EAS_NO_VCS=1
ENV EAS_PROJECT_ROOT=/home/ubuntu/work
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 \
  --mount=type=secret,id=EXPO_TOKEN,env=EXPO_TOKEN \
  --mount=type=secret,id=eas-credentials-json,target=/home/ubuntu/work/packages/my-app/credentials.json,uid=1000,gid=1000 \
  --mount=type=tmpfs,target=/home/ubuntu/work/packages/my-app/credentials \
  eas build --non-interactive --platform=ios --profile=preview

# EAS iOS build
FROM prebuild-env AS eas-update
ENV EAS_NO_VCS=1
ENV EAS_PROJECT_ROOT=/home/ubuntu/work
ARG EAS_UPDATE_CHANNEL=preview
ARG EAS_UPDATE_MESSAGE=Docker build
RUN --mount=type=cache,target=/home/ubuntu/.npm,uid=1000,gid=1000 \
  --mount=type=secret,id=EXPO_TOKEN,env=EXPO_TOKEN \
  --mount=type=secret,id=eas-credentials-json,target=/home/ubuntu/work/packages/my-app/credentials.json,uid=1000,gid=1000 \
  --mount=type=tmpfs,target=/home/ubuntu/work/packages/my-app/credentials \
  eas update --channel=${EAS_UPDATE_CHANNEL} --non-interactive --message="${EAS_UPDATE_MESSAGE}"

# Appium build
FROM appium/appium:v2.11.4-p1 AS appium
COPY --from=preview-apk /home/ubuntu/work/packages/my-app/android/app/build/outputs/apk/release/app-release.apk /app-release.apk

# Final Stage: Multiplatform APK delivery (no specific platform)
FROM busybox:stable
COPY --from=devclient /home/ubuntu/work/packages/my-app/android/app/build/outputs/apk/debug/app-debug.apk /app-dev-client.apk
COPY --from=preview-apk /home/ubuntu/work/packages/my-app/android/app/build/outputs/apk/release/app-release.apk /app-release.apk
