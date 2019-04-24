describe('Market Listing good scenarios', () => {
  it('Lots of mixed tests', () => {
    cy.visit('/market/usd/bch-usd');
    cy.location('pathname').should('equal', '/market/usd/bch-usd');

    // Проверка ответа на запрос, хотя для этого уже есть валидаторы
    cy.wait('@symbolsList')
      .its('response.body')
      .should(data => {
        expect(data).to.be.an('array');
      });

    // Дожидаемся всех запросов
    cy.wait('@rates');
    cy.wait('@marketsList');
    cy.wait('@symbolInfo');
    cy.wait('@chartData');

    // Проверяем переход на другую торгуемую валюту
    cy.get('#marketTab-eth').click();
    cy.location('pathname').should('equal', '/market/eth/bch-usd');
    cy.wait('@rates');
    cy.wait('@marketsList');

    // Проверяем смену локализации
    cy.contains('Рынки');
    cy.get('#langSwitcher-en').click();
    cy.contains('Markets list');

    // Проверяем смену темы
    cy.get('body').should('have.class', 'light');
    cy.get('#themeSwitcher-dark').click();
    cy.get('body').should('have.class', 'dark');
  });
});
