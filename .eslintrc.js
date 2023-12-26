module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  globals: {
    __DEV__: false
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended', '@react-native-community'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/prop-types': [
      0,
      {
        ignore: ['relaxProps']
      }
    ],
    'no-console': [1, { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_'
      }
    ],
    'no-var': ['error'],
    'react/no-deprecated': 0
  }
};
