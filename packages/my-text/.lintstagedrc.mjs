import baseConfig from '../../.lintstagedrc.mjs';
export default {
  ...baseConfig,
  '*.{ts,tsx}': [
    'npm run lint -- --fix',
    () => 'tsc --noEmit',
    'jest --bail --findRelatedTests',
  ],
};
