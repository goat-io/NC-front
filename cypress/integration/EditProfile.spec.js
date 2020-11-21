/// <reference types="cypress" />

context("Edit Email", () => {
  it("Should edit email", () => {
    cy.login();
    const randomNumber = Math.floor(Math.random() * Math.floor(200000));
    cy.get(".float-right > .btn").click();
    cy.get("#email")
      .clear()
      .type(`cacb${randomNumber}@cacb.com`)
      .should("have.value", `cacb${randomNumber}@cacb.com`);

    cy.get("button.ladda-button.ml-2.btn.btn-primary").click();
    cy.contains(`Your profile was saved!`);
    cy.logout();
  });
});
