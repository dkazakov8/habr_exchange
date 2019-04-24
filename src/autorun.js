/* eslint-disable no-unused-vars */

import { autorun } from 'mobx';

import { renderToDOM } from 'utils';
import App from 'components/App';

const loggingEnabled = false;

function logReason(autorunName, reaction) {
  if (!loggingEnabled || reaction.observing.length === 0) {
    return false;
  }

  const logString = reaction.observing.reduce(
    (str, { name, value }) => `${str}${name} changed to ${value}; `,
    ''
  );

  console.log(`autorun-${autorunName}`, logString);
}

/**
 * @param store {RootStore}
 */
export function initAutorun(store) {
  autorun(reaction => {
    if (store.global.shouldAppRender) {
      renderToDOM(App);
    }

    logReason('shouldAppRender', reaction);
  });
}
