/// <reference types="cypress" />

context('Validation', () => {
  it('Should validate invalid inputs', () => {
    cy.login()
    cy.get('.float-right > .btn').click()
    cy.get('#name').clear()
    cy.contains('Name is required')

    cy.get('#email').clear()
    cy.contains('Email is required')

    cy.get('#email').type(`cacb@cacb`)
    cy.contains('Email is not valid')
    cy.logout()
  })
})
