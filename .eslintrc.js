module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'off',

    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,

    // allow backticks
    // quotes: ['error', 'backtick', 'double'],

    // 'prettier/prettier': ['error', {singleQuote: true}],

    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ], //should add ".ts" if typescript project
  },
  parser: '@babel/eslint-parser',
};
