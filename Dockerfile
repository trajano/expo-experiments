FROM domjtalbot/volta:latest AS prebuild
RUN volta install node
WORKDIR /w/
COPY ./ /w/
RUN --mount=type=cache,target=/root/.npm npm ci
WORKDIR /w/packages/my-app
RUN --mount=type=cache,target=/root/.npm --mount=type=tmpfs,target=/tmp volta run npx expo prebuild --platform all

FROM cimg/android:2024.08-node
COPY --from=prebuild --chown=circleci:circleci /w/ /home/circleci/project/
WORKDIR /home/circleci/project/packages/my-app/android
USER root
RUN --mount=type=cache,target=/var/lib/apt/lists apt-get update \
  && apt-get install -y --no-install-recommends \
    ninja-build
ENV GRADLE_OPTS=-Xmx4g
RUN --mount=type=cache,target=/root/.gradle/wrapper/dists \
  ./gradlew assembleDebug

# Output file is in /home/circleci/project/packages/my-app/android/app/build/outputs/apk/debug/app-debug.apk

# RUN --mount=type=cache,target=/home/circleci/.gradle/wrapper/dists \
#   ./gradlew assembleDebug
