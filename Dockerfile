FROM domjtalbot/volta:latest AS prebuild
RUN volta install node
WORKDIR /w/
COPY ./ /w/
RUN --mount=type=cache,target=/root/.npm npm ci
WORKDIR /w/packages/my-app
RUN --mount=type=cache,target=/root/.npm --mount=type=tmpfs,target=/tmp volta run npx expo prebuild --platform all

# Use the official Eclipse Temurin 17 JDK base image
FROM eclipse-temurin:17-jdk
ENV VOLTA_HOME=/root/.volta
ENV PATH=$VOLTA_HOME/bin:$PATH
RUN curl https://get.volta.sh | bash && volta install node
COPY --from=prebuild /w/ /w/
WORKDIR /w/packages/my-app/android
RUN --mount=type=cache,target=/root/.gradle/wrapper/dists \
  ./gradlew assembleDebug
