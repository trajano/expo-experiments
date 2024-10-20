import { getConfig } from '@expo/config';
import { dirname } from 'node:path';
import appConfig from '../app.config';
import metroConfig from '../metro.config';
it('metro.config should load up properly', () => {
  expect(metroConfig).toBeTruthy();
  expect(metroConfig.resolver?.blockList).not.toHaveLength(0);
});
it('app.config should load up properly', () => {
  expect(appConfig).toBeTruthy();
  const expoConfig = getConfig(dirname(dirname(__filename))).exp;
  expect(expoConfig).toBeTruthy();
  expect(expoConfig.android?.versionCode).toBeTruthy();
});
