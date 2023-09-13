import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: cadastrar cliente com sucesso
//Given: common-step-definitions.ts

Given(
  "eu estou na página de {string}",(page: string) => {
    cy.visit(page);
  }
);

  When("Eu preencho o campo {string} com {string},o campo {string} com {string} e clico no botão {string}", (email: string, emailValue: string,password: string, passwordValue: string, button: string) => {
    cy.getDataCy(email).type(emailValue);
    cy.getDataCy(password).type(passwordValue);
    cy.getDataCy(button).click();
  });
  
    Then("Eu vou para a página {string}", (page: string) => {
      cy.url().should("include", page);
    });

// Scenario: login com erro
Given("Estou na página de {string}", (page: string) => {
  cy.visit(page);
});

When("preencho o campo {string} com {string},o campo {string} com {string} e clico no botão {string}", (email: string, emailValue: string,password: string, passwordValue: string, button: string) => {
  cy.getDataCy(email).type(emailValue);
  cy.getDataCy(password).type(passwordValue);
  cy.getDataCy(button).click();
});

Then("vejo uma indicação que não posso logar {string}", (popup: string) => {
  cy.getDataCy(popup).should("be.visible");
});

// Scenario: login faltando campos

Given("O Usuario esta na pagina {string}", (page: string) => {
  cy.visit(page);
});

When("O Usuario preenche o campo {string} com {string} e clica no botão {string}", (email: string, emailValue: string, button: string) => {
  cy.getDataCy(email).type(emailValue);
  cy.getDataCy(button).click();
});

Then("Ele permanece na pagina {string}", (page: string) => {
  cy.url().should("include", page);
});
