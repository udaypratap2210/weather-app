'use strict'

module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true
  },
  globals: {
    Audios: true,
    Element: true,
    Event: true,
    fine: true,
    localStorage: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // "plugin:prettier/recommended",
    // "plugin:react-hooks/recommended",
    'plugin: import/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'babel', 'react-hooks'],
  rules: {
    // add customize rules here as per your project's needs
    'array-bracket-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'import/newline-after-import': [
      'error',
      {
        count: 2
      }
    ],
    indent: [
      'error',
      4,
      {
        SwitchCase: 1
      }
    ],
    'multiline-ternary': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2
      }
    ],
    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'lifecycle',
          'everything-else',
          '/^on.+$/',
          'render'
        ],
        groups: {
          lifecycle: ['everything-else', 'getDerivedStateFromProps']
        }
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: false,
        natural: false
      }
    ],
    'space-before-function-paren': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
