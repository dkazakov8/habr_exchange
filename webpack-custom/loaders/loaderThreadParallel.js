/**
 * @docs: https://github.com/webpack-contrib/thread-loader
 *
 */

module.exports = {
  loader: 'thread-loader',
  options: {
    workers: 4,
    poolParallelJobs: 50,
  },
};
