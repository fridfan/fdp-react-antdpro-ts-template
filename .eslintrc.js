module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
    BASEURL: true
  },
  rules: {
    'react-hooks/rules-of-hooks': 0,
    // ''
  }
};
