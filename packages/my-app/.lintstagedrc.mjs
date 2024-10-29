import baseConfig from '../../.lintstagedrc.mjs';

export default {
  ...baseConfig,
  '*.{ts,tsx}': [
    'npm run lint -- --fix',
    // for expo-router, regenerate the types before running tsc --noEmit
    () => ['npx expo customize tsconfig.json', 'tsc --noEmit'],
    // for Expo App project, because it's more difficult to write tests allow passing with no tests
    'jest --bail --findRelatedTests --passWithNoTests',
  ],
};
