export default {
  '*.{ts,tsx,js,mjs,json,md,yml,yaml}': 'prettier --write',
  // chances are JS files are used for configuration only, only TypeScript files would be considered part of the application
  '*.{js,mjs}': 'eslint --fix',
};
