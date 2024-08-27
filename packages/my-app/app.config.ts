import { ExpoConfig, ConfigContext } from '@expo/config';

/**
 * Generates an Android version code based on the given version string, major version number, and run padding.
 * The version code is calculated in the format: major * 10^(8 + runPadding) + date portion * 10^runPadding + run.
 *
 * @param version - A version string expected to be in the format `yyyyMMdd.##`, where `yyyyMMdd` is the date and `##` is the two-digit run number.
 * @param major - The major version number to be used in the version code calculation. Defaults to 1.
 * @param runPadding - The number of digits to pad the run portion of the version code. Defaults to 3.
 * @returns The calculated Android version code as a number.
 */
const androidVersionCode = (
  version: string,
  major: number = 1,
  runPadding: number = 3,
): number => {
  const [datePart, runPart] = version.split('.');
  const dateNumber = parseInt(datePart, 10);
  const runNumber = parseInt(runPart, 10);
  const versionCode =
    major * Math.pow(10, 8 + runPadding) +
    dateNumber * Math.pow(10, runPadding) +
    runNumber;
  return versionCode;
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const version = (process.env.BUILD_BUILDNUMBER ?? config.version)!;
  return {
    ...config,
    name: (process.env.APP_NAME ?? config.name)!,
    slug: config.slug!,
    version,
    ios: {
      ...config.ios,
      bundleIdentifier: (process.env.APP_ID ?? config.ios!.bundleIdentifier)!,
    },
    android: {
      ...config.android,
      package: (process.env.APP_ID ?? config.android!.package)!,
      versionCode: androidVersionCode(version),
    },
  };
};
