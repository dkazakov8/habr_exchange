/**
 * @docs: https://webpack.js.org/configuration/entry-context
 *
 */

const path = require('path');

const { sourcePath } = require('../utils/paths');

module.exports = {
  app: [path.resolve(sourcePath, 'app.js')].filter(Boolean),
};
