/// <reference types="cypress" />

context('Name', () => {
  it('Should edit Name', () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(200000))
    cy.login()
    cy.get('.float-right > .btn').click()
    cy.get('#name')
      .clear()
      .type(`Ignacio Cabrera ${randomNumber}`)
      .should('have.value', `Ignacio Cabrera ${randomNumber}`)

    cy.get('button.ladda-button.ml-2.btn.btn-primary').click()

    cy.contains(`Ignacio Cabrera ${randomNumber}'s profile`)
    cy.logout()
  })
})
