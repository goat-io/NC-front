// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:3000/#/login', {
    onBeforeLoad: (win) => {
      win.sessionStorage.clear()
      win.localStorage.clear()
      win.indexedDB.deleteDatabase('firebaseLocalStorageDb')
    },
  })
  cy.get('.firebaseui-id-country-selector').click()
  cy.get("[data-listboxid='56-CL-0']").click()

  cy.get('#ui-sign-in-phone-number-input')
    .type('993254385')
    .should('have.value', '993254385')
  cy.wait(1000)

  cy.get('.firebaseui-id-submit').click()
  cy.wait(1000)

  cy.get('#ui-sign-in-phone-confirmation-code-input')
    .type('123456')
    .should('have.value', '123456')

  cy.get('.firebaseui-id-submit').click()

  cy.contains('profile')
})

Cypress.Commands.add('logout', () => {
  cy.get('.p-1').click({ multiple: true, force: true })
  cy.get(
    'button.btn-pill.btn-shadow.btn-shine.bg-secondary.btn.btn-secondary',
  ).click({ multiple: true, force: true })
})
