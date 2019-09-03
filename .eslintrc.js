module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  // extends: ['plugin:vue/essential', '@vue/standard'],
  extends: ['plugin:vue/strongly-recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [0, 'never'],
    'no-spaced-func': 2,
    'space-before-function-paren': [0, 'always'],
    'no-dupe-keys': 2,
    semi: 0,
    'vue/max-attributes-per-line': 'off',
    'vue/name-property-casing': 'off',
    "vue/html-self-closing": "off",
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
