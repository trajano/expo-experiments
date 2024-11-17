import { ExpoConfig, getConfig } from '@expo/config';
import { dirname, join } from 'node:path';
import appConfig from '../../app.config';
import { expo as expoConfig } from '../../app.json';
import metroConfig from '../../metro.config';
import * as fs from 'node:fs';

it('metro.config should load up properly', () => {
  expect(metroConfig).toBeTruthy();
  expect(metroConfig.resolver?.blockList).not.toHaveLength(0);
});
it('app.config should load up properly', () => {
  expect(appConfig).toBeTruthy();
  const config = getConfig(dirname(dirname(dirname(__filename))), {
    isPublicConfig: true,
    strict: true,
  });
  const expoConfig = config.exp;
  expect(expoConfig).toBeTruthy();
  expect(expoConfig.android?.versionCode).toBe(102);
  expect(expoConfig.version).toBe('1.2.3');
  expect(config.staticConfigPath).toBe(
    join(dirname(dirname(dirname(__filename))), 'app.json'),
  );
  expect(config.dynamicConfigPath).toBe(
    join(dirname(dirname(dirname(__filename))), 'app.config.ts'),
  );
});

describe('Tests that change environment variables', () => {
  let savedProcessEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...savedProcessEnv, BUILD_BUILDNUMBER: undefined };
  });
  afterEach(() => {
    process.env = savedProcessEnv;
  });

  const processedConfig = () =>
    appConfig({
      config: expoConfig as Partial<ExpoConfig>,
      projectRoot: dirname(dirname(dirname(__filename))),
      staticConfigPath: join(dirname(dirname(dirname(__filename))), 'app.json'),
      packageJsonPath: join(
        dirname(dirname(dirname(__filename))),
        'package.json',
      ),
    });

  const tryBuildNumber = (
    buildNumber: string | undefined,
    expectedAndroidVersionCode: number,
  ): void => {
    process.env.BUILD_BUILDNUMBER = buildNumber;
    const config = processedConfig();
    return it(`BUILD_BUILDNUMBER ${buildNumber} matches`, () => {
      expect(config.android?.versionCode).toBe(expectedAndroidVersionCode);
      expect(config.version).toBe(buildNumber);
    });
  };
  tryBuildNumber('20241003.03', 2024100303);
  tryBuildNumber('20241003.3', 2024100303);

  it('should still work if build number is not set', () => {
    const config = processedConfig();
    expect(config.version).toEqual('1.2.3');
    expect(config.android?.versionCode).toEqual(102);
  });
  it('should fail on Android version that would yield > 2100000000', () => {
    process.env.BUILD_BUILDNUMBER = '21000101.02';

    expect(processedConfig).toThrow(
      new Error('Android limits version code to 2100000000'),
    );
  });

  it('adaptive-icon branding', () => {
    process.env.EXPO_APP_BRAND = 'release';
    const config = processedConfig();
    const adaptiveImagePath = config.android?.adaptiveIcon?.foregroundImage!;
    expect(adaptiveImagePath).toContain('release');
    expect(fs.existsSync(adaptiveImagePath)).toBeTruthy();
  });
});
