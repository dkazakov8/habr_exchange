/**
 * @docs: https://webpack.js.org/configuration/devtool
 *
 */

const { getParam } = require('../utils/envParams');

module.exports = getParam('DEV_TOOL');
