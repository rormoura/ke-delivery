import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(page);
});

Given("Eu estou na página {string}", (page: string) => {
  cy.visit(page);
});

