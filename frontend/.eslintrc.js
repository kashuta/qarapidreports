module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-closing-bracket-location': 0,
    'import/no-extraneous-dependencies': 0,
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
  },
};
