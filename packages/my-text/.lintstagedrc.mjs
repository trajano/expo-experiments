import baseConfig from '../../.lintstagedrc.mjs';
export default {
  ...baseConfig,
  '*.{ts,tsx,js}': [
    'npm run lint -- --fix',
    () => 'tsc --noEmit',
    'jest --bail --findRelatedTests',
  ],
};
