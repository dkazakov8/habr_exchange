/**
 * @docs: https://webpack.js.org/configuration/module
 *
 */

const ruleBabel = require('../rules/ruleBabel');
const ruleSass = require('../rules/ruleSass');
const ruleImages = require('../rules/ruleImages');
const ruleSvgInline = require('../rules/ruleSvgInline');
const ruleSassThemes = require('../rules/ruleSassThemes');

module.exports = {
  rules: [ruleBabel, ruleSass, ruleSassThemes, ruleSvgInline, ruleImages],
};
