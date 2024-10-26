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

export default ({ config, staticConfigPath }: ConfigContext): ExpoConfig => {
  /**
   * Gets the branded version of the source depending on the value
   * of the EXPO_APP_BRAND variable.  If the branded version does not
   * exist it returns the original value.
   * @param src brand source folder. It is expected to be `./brand/resource.ext`
   * @returns branded path
   */
  const branded = (src?: string): string | undefined => {
    if (src === undefined) {
      return undefined;
    } else if (!process.env.EXPO_APP_BRAND) {
      return src;
    } else {
      const brand = process.env.EXPO_APP_BRAND;
      const newPath = src.replace(
        './brand/',
        path.join(path.dirname(staticConfigPath!), `./brand/${brand}/`),
      );
      if (fs.existsSync(newPath)) {
        return newPath;
      } else {
        return src;
      }
    }
  };

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
    name: (process.env.EXPO_APP_NAME ?? config.name)!,
    slug: config.slug!,
    icon: branded(config.icon),
    splash: {
      ...config.splash,
      image: branded(config.splash?.image),
    },
    notification: {
      ...config.notification,
      icon: branded(config.notification?.icon),
    },
    version,
    ios: {
      ...config.ios,
      bundleIdentifier: (process.env.EXPO_APP_ID ??
        config.ios!.bundleIdentifier)!,
      splash: {
        ...config.ios?.splash,
        image: branded(config.ios?.splash?.image),
        tabletImage: branded(config.ios?.splash?.tabletImage),
        dark: {
          ...config.ios?.splash?.dark,
          image: branded(config.ios?.splash?.dark?.image),
          tabletImage: branded(config.ios?.splash?.dark?.tabletImage),
        },
      },
    },
    android: {
      ...config.android,
      package: (process.env.EXPO_APP_ID ?? config.android!.package)!,
      versionCode: androidVersionCode(version),
      ...(googleServicesFilePath && {
        googleServicesFile: googleServicesFilePath,
      }),
      adaptiveIcon: {
        ...config.android?.adaptiveIcon,
        foregroundImage: branded(config.android?.adaptiveIcon?.foregroundImage),
        monochromeImage: branded(config.android?.adaptiveIcon?.monochromeImage),
        backgroundImage: branded(config.android?.adaptiveIcon?.backgroundImage),
      },
      splash: {
        ...config.android?.splash,
        image: branded(config.android?.splash?.image),
        mdpi: branded(config.android?.splash?.mdpi),
        hdpi: branded(config.android?.splash?.hdpi),
        xhdpi: branded(config.android?.splash?.xhdpi),
        xxhdpi: branded(config.android?.splash?.xxhdpi),
        xxxhdpi: branded(config.android?.splash?.xxxhdpi),
        dark: {
          ...config.android?.splash?.dark,
          image: branded(config.android?.splash?.dark?.image),
          mdpi: branded(config.android?.splash?.dark?.mdpi),
          hdpi: branded(config.android?.splash?.dark?.hdpi),
          xhdpi: branded(config.android?.splash?.dark?.xhdpi),
          xxhdpi: branded(config.android?.splash?.dark?.xxhdpi),
          xxxhdpi: branded(config.android?.splash?.dark?.xxxhdpi),
        },
      },
    },
  };
};
