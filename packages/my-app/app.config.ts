import { ExpoConfig, ConfigContext } from '@expo/config';
import * as fs from 'fs';
import * as path from 'node:path';

/**
 * Generates an Android version code based on the given version string, major version number, and run padding.
 * The version code is calculated in the format: major * 10^(8 + runPadding) + date portion * 10^runPadding + run.
 *
 * @param version - A version string expected to be in the format `yyyyMMdd.##`, where `yyyyMMdd` is the date and `##` is the two-digit run number.
 * @param major - The major version number to be used in the version code calculation. Defaults to 0.
 * @param runPadding - The number of digits to pad the run portion of the version code. Defaults to 2.
 * @returns The calculated Android version code as a number.
 */
const androidVersionCode = (
  version: string,
  major: number = 0,
  runPadding: number = 2,
): number => {
  const [datePart, runPart] = version.split('.');
  const dateNumber = parseInt(datePart, 10);
  const runNumber = parseInt(runPart, 10);
  const versionCode =
    major * Math.pow(10, 8 + runPadding) +
    dateNumber * Math.pow(10, runPadding) +
    runNumber;
  if (versionCode > 2100000000) {
    throw new Error('Android limits version code to 2100000000');
  }
  return versionCode;
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const version = (process.env.BUILD_BUILDNUMBER ?? config.version)!;

  // Define the paths to check for the google-services.json file
  const googleServicesFilePaths = [
    '/run/secrets/google-services-json',
    path.resolve(__dirname, '../../google-services.json'),
  ];

  // Find the first existing google-services.json file
  const googleServicesFilePath = googleServicesFilePaths.find(fs.existsSync);

  return {
    ...config,
    name: (process.env.EXPO_PUBLIC_APP_NAME ?? config.name)!,
    slug: config.slug!,
    version,
    ios: {
      ...config.ios,
      bundleIdentifier: (process.env.EXPO_PUBLIC_APP_ID ??
        config.ios!.bundleIdentifier)!,
    },
    android: {
      ...config.android,
      package: (process.env.EXPO_PUBLIC_APP_ID ?? config.android!.package)!,
      versionCode: androidVersionCode(version),
      ...(googleServicesFilePath && {
        googleServicesFile: googleServicesFilePath,
      }),
    },
  };
};
