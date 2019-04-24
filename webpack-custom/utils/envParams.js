/**
 * @docs: https://github.com/mrsteele/dotenv-webpack
 *
 */

const path = require('path');
const Dotenv = require('dotenv-webpack');

const { rootPath } = require('./paths');

let envParams = null;

function setEnvParams() {
  if (!envParams) {
    envParams = new Dotenv({
      path: path.resolve(rootPath, '.frontend.env'),
      safe: path.resolve(rootPath, '.frontend.env.example'),
      systemvars: false,
      defaults: false,
    });
  }
}

function getParam(param) {
  setEnvParams();

  return envParams.definitions[`process.env.${param}`].slice(1).slice(0, -1);
}

function getParamAsNumber(param) {
  return Number(getParam(param));
}

function getParamAsBoolean(param) {
  return getParam(param) === 'true';
}

module.exports = {
  getParam,
  getParamAsNumber,
  getParamAsBoolean,
  isProduction: getParam('NODE_ENV') === 'production',
};
