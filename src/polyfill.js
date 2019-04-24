import { toJS } from 'mobx';

console.js = function consoleJsCustom(...args) {
  console.log(...args.map(arg => toJS(arg)));
};
