import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";


// Given: common-step-definitions.ts
Given("Eu estou na página {string}", (page: string) => {
  cy.visit(page);
});

When(
  "Eu clico no botão {string}", (button: string) => {
    cy.getDataCy(button).click();
  }
);

Then(
  "Eu sou redirecionada para página {string}", (page: string) => {
    cy.url().should("include", page);
  }
);