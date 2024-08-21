module.exports = {
  extends: ['expo', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: { alwaysTryTypes: true },
    },
  },
};
