// @ts-check
/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const path = require('path');

const monorepoRoot = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

config.watchFolders = [monorepoRoot];
if (!config.resolver) {
  throw new Error('config.resolver is undefined');
}
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];
if (Array.isArray(config.resolver.blockList)) {
  config.resolver.blockList = [...config.resolver.blockList, /.*\.test\..*/];
} else if (typeof config.resolver.blockList === 'object') {
  config.resolver.blockList = [config.resolver.blockList, /.*\.test\..*/];
}

module.exports = withStorybook(config, {
  enabled: true,
  configPath: path.resolve(__dirname, './.storybook'),
});
