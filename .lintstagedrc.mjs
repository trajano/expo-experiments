const baseConfig = {
  '*.{ts,tsx,js,mjs,json,md,yml,yaml}': 'prettier --write',
  Dockerfile: 'prettier --write',
  // chances are JS files are used for configuration only, only TypeScript files would be considered part of the application
  '*.{js,mjs}': 'eslint --fix',
};
export default baseConfig;
export const libConfig = {
  ...baseConfig,
  '*.{ts,tsx}': [
    'npm run lint -- --fix',
    () => 'tsc --noEmit',
    'jest --bail --findRelatedTests',
  ],
};
