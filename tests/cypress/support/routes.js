import { apiRoutes } from 'api';

before(() => {
  cy.server();
  cy.route(`${apiRoutes.symbolsList.url}**`).as('symbolsList');
  cy.route(`${apiRoutes.rates.url}**`).as('rates');
  cy.route(`${apiRoutes.marketsList.url}**`).as('marketsList');
  cy.route(`${apiRoutes.symbolInfo.url({ id: 'bitcoin-cash' })}**`).as(
    'symbolInfo'
  );
  cy.route(`${apiRoutes.chartData.url}**`).as('chartData');
});
