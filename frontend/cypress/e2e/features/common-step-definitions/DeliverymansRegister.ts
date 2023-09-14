import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Cadastro de cliente com sucesso
//Given: common-step-definitions.ts

  Given(
    "Eu estou na página de {string}",(page: string) => {
      cy.visit(page);
    }
  );

  When("Eu preencho o campo {string} com {string}, o campo {string} com {string} ,o campo {string} com {string} e clico no botão {string}", (name: string, nameValue: string, email: string, emailValue: string, numOrders: string, numOrdersValue: string, button: string) => {
    cy.getDataCy(name).type(nameValue);
    cy.getDataCy(email).type(emailValue);
    cy.getDataCy(numOrders).type(numOrdersValue);
    cy.getDataCy(button).click();
  });
  
  Then("Eu vou para a página de {string}", (page: string) => {
    cy.url().should("include", page);
  });

// Scenario: Cadastro de cliente faltando campos
  Given(
    "Eu estou na página de {string}",(page: string) => {
      cy.visit(page);
    }
  );

  When("Eu preencho o campo {string} com {string}, o campo {string} com {string} ,o campo {string} com {string} e clico no botão {string}", (name: string, nameValue: string, email: string, emailValue: string, numOrders: string, numOrdersValue: string, button: string) => {
    cy.getDataCy(name).type(nameValue);
    cy.getDataCy(email).type(emailValue);
    cy.getDataCy(numOrders).type(numOrdersValue);
    cy.getDataCy(button).click();
  });

  Then("Eu permaneço na página de {string}", (page: string) => {
    cy.url().should("include", page);
  });