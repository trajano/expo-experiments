// @ts-check
/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const path = require('path');

const monorepoRoot = path.resolve(__dirname, '../..');

const config = getDefaultConfig(__dirname);

config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
  ...config.resolver.nodeModulesPaths,
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];
const additionalAssetExts = ['lottie', 'fbx'];
config.resolver.assetExts = [
  ...config.resolver.assetExts,
  ...additionalAssetExts,
];
const testRegexs = [/^.*\/[^/]+\.test\.[^/]+$/, /(\\__mocks__\\.*)$/];
if (Array.isArray(config.resolver.blockList)) {
  config.resolver.blockList = [...config.resolver.blockList, ...testRegexs];
} else if (typeof config.resolver.blockList === 'object') {
  config.resolver.blockList = [config.resolver.blockList, ...testRegexs];
}

config.transformer.unstable_allowRequireContext = true;

// due to the nature of this project where it's playing around with packages in and out it's best to reset the cache.
config.resetCache = true;

// @ts-ignore
module.exports = withStorybook(config, {
  enabled: true,
  configPath: path.resolve(__dirname, './.storybook'),
});
