let polyfill = null;

before(() => {
  const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
  cy.request(polyfillUrl).then(response => {
    polyfill = response.body;
  });
});

Cypress.on('window:before:load', window => {
  delete window.fetch;
  window.eval(polyfill);
  window.fetch = window.unfetch;
});
