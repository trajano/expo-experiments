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
};

module.exports = {
  extends: ['expo', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: { alwaysTryTypes: true },
    },
  },
  // override the incorrect typing.
  plugins: ['prefer-arrow'] as any,
  rules,
} as Linter.Config;
