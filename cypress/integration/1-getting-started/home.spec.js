/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Portfolio landing page", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("should toggle the navigation menu", () => {
    cy.viewport(550, 770);

    cy.get("[data-cy=call_to_action]").should("be.visible");

    cy.get("[data-cy=burger]").click();
    cy.get("[data-cy=call_to_action]").should("not.be.visible");
    cy.get("[data-cy=overlay]").should("be.visible");

    cy.get("[data-cy=overlay_burger]").click();
    cy.get("[data-cy=call_to_action]").should("be.visible");


  });
});
