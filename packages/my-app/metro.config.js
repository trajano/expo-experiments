// @ts-nocheck
/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const path = require('path');

const monorepoRoot = path.resolve(__dirname, '../..');

let config = getDefaultConfig(__dirname);

config = withStorybook(config, {
  enabled: true,
  configPath: path.resolve(__dirname, './.storybook'),
});

const testRegExps = [/^.*\/[^/]+\.test\.[^/]+$/, /(\\__mocks__\\.*)$/];
/** @type {RegExp[]} */
let blockList;
if (config.resolver?.blockList) {
  blockList = Array.isArray(config.resolver?.blockList)
    ? [...config.resolver.blockList, ...testRegExps]
    : [config.resolver.blockList, ...testRegExps];
} else {
  blockList = testRegExps;
}

module.exports = mergeConfig(config, {
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    assetExts: [...(config.resolver?.assetExts ?? []), 'lottie', 'fbx', 'html'],
    blockList,
  },
  transformer: {
    unstable_allowRequireContext: true,
  },
  // due to the nature of this project where it's playing around with packages in and out it's best to reset the cache.
  resetCache: true,
});
