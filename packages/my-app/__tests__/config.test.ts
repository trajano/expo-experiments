import { ExpoConfig, getConfig } from '@expo/config';
import { dirname, join } from 'node:path';
import appConfig from '../app.config';
import { expo as expoConfig } from '../app.json';
import metroConfig from '../metro.config';
it('metro.config should load up properly', () => {
  expect(metroConfig).toBeTruthy();
  expect(metroConfig.resolver?.blockList).not.toHaveLength(0);
});
it('app.config should load up properly', () => {
  expect(appConfig).toBeTruthy();
  const config = getConfig(dirname(dirname(__filename)), {
    isPublicConfig: true,
    strict: true,
  });
  const expoConfig = config.exp;
  expect(expoConfig).toBeTruthy();
  expect(expoConfig.android?.versionCode).toBe(102);
  expect(expoConfig.version).toBe('1.2.3');
  expect(config.staticConfigPath).toBe(
    join(dirname(dirname(__filename)), 'app.json'),
  );
  expect(config.dynamicConfigPath).toBe(
    join(dirname(dirname(__filename)), 'app.config.ts'),
  );
});

describe('Versions match BUILD_BUILDNUMBER', () => {
  let savedProcessEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...savedProcessEnv };
  });
  afterEach(() => {
    process.env = savedProcessEnv;
  });

  const tryBuildNumber = (
    buildNumber: string,
    expectedAndroidVersionCode: number,
  ): void => {
    process.env.BUILD_BUILDNUMBER = buildNumber;
    const config = appConfig({
      config: expoConfig as Partial<ExpoConfig>,
      projectRoot: dirname(dirname(__filename)),
      staticConfigPath: join(dirname(dirname(__filename)), 'app.json'),
      packageJsonPath: join(dirname(dirname(__filename)), 'package.json'),
    });
    return it(buildNumber, () => {
      expect(config.android?.versionCode).toBe(expectedAndroidVersionCode);
      expect(config.version).toBe(buildNumber);
    });
  };
  tryBuildNumber('20241003.03', 2024100303);
  tryBuildNumber('20241003.3', 2024100303);
});
