module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    'cypress/globals': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    './rules/best-practices.yaml',
    './rules/ecmascript-6.yaml',
    './rules/node-js-and-common-js.yaml',
    './rules/possible-errors.yaml',
    './rules/strict-mode.yaml',
    './rules/stylistic-issues.yaml',
    './rules/variables.yaml',
    './rules/react.yaml',
    'prettier',
    'prettier/babel',
    'prettier/react',
  ],
  plugins: ['react', 'prettier', 'import', 'react-hooks', 'cypress'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
        proseWrap: 'never',
      },
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  globals: {
    SENTRY_URL: true,
    HOT_RELOAD: true,
    PUBLIC_URL: true,
  },
};
