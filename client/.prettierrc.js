// https://prettier.io/docs/en/index.html
// js=> cjs
/** @type {import("prettier").Options} */
const config = {
  printWidth: 80,

  tabWidth: 2,
  useTabs: false,

  singleQuote: true,
  quoteProps: 'consistent',

  semi: false,
  trailingComma: 'all',

  bracketSpacing: true,
  arrowParens: 'always',

  rangeStart: 0,
  rangeEnd: Number.POSITIVE_INFINITY,

  endOfLine: 'lf',
};

module.exports = config;
