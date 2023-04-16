module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // Add custom rules here
    'no-console': 0,
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'class-methods-use-this': 0,
    'max-len': 0,
    'consistent-return': 0,
    'no-restricted-syntax': 0,
  },
};
