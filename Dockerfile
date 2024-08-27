FROM domjtalbot/volta:latest AS prebuild
RUN volta install node
WORKDIR /w/
COPY ./ /w/
RUN --mount=type=cache,target=/root/.npm npm ci
WORKDIR /w/packages/my-app
RUN --mount=type=cache,target=/root/.npm --mount=type=tmpfs,target=/tmp volta run npx expo prebuild --platform all

FROM cimg/android:2024.08-node
COPY --from=prebuild /w/ /home/circlecli/project/
WORKDIR /home/circlecli/project/packages/my-app/android
RUN --mount=type=cache,target=/root/.gradle/wrapper/dists \
  ./gradlew assembleDebug
