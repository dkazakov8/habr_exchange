/**
 * @docs: https://webpack.js.org/configuration/resolve
 *
 */

const path = require('path');

const { rootPath, sourcePath } = require('../utils/paths');

module.exports = {
  modules: [sourcePath, path.resolve(rootPath, 'node_modules')],
  extensions: ['.js'],
  alias: {
    'react-dom': '@hot-loader/react-dom',
  },
};
