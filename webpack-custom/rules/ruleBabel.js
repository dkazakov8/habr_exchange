const { sourcePath } = require('../utils/paths');

const loaderBabel = require('../loaders/loaderBabel');
const loaderThreadParallel = require('../loaders/loaderThreadParallel');

module.exports = {
  test: /\.jsx?$/,
  include: [sourcePath],
  use: [loaderThreadParallel, loaderBabel],
};
