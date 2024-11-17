import { Linter } from 'eslint';

const rules: Linter.RulesRecord = {
  'prefer-arrow/prefer-arrow-functions': [
    'error',
    {
      disallowPrototype: true, // Disallows the use of `prototype` in function declarations.
      singleReturnOnly: false, // Allow more than just single return statements in arrow functions.
      classPropertiesAllowed: false, // Disallow using class properties instead of function expressions.
    },
  ],
  eqeqeq: ['error'],
  'import/no-unresolved': ['error'],
  'no-restricted-imports': [
    'error',
    {
      paths: [
        {
          name: 'react',
          importNames: ['default'],
        },
      ],
    },
  ],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      caughtErrorsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-empty-object-type': [
    'error',
    {
      allowInterfaces: 'with-single-extends',
    },
  ],
};

module.exports = {
  extends: ['expo', 'prettier', 'turbo'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        // both are needed, the first one is for CLI and the second one is for VS Code.
        project: ['../../packages/*/tsconfig.json', 'packages/*/tsconfig.json'],
      },
    },
  },
  // override the incorrect typing.
  plugins: ['prefer-arrow', 'import'] as any,
  rules,
} as Linter.Config;
