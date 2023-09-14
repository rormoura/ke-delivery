import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Cadastro de cliente com sucesso
//Given: common-step-definitions.ts

  Given("Eu me encontro na página {string}", (page: string) => {
    cy.visit(page);
  });

  When("Eu preencho o campo {string} com {string}, o campo {string} com {string} ,o campo {string} com {string} e clico no botão {string}", (name: string, nameValue: string, email: string, emailValue: string, numOrders: string, numOrdersValue: string, button: string) => {
    cy.getDataCy(name).type(nameValue);
    cy.getDataCy(email).type(emailValue);
    cy.getDataCy(numOrders).type(numOrdersValue);
    cy.getDataCy(button).click();
  });
  
  Then("Eu devo estar na página {string}", (page: string) => {
    cy.url().should("include", page);
  });

// Scenario: Cadastro de cliente faltando campos

  Given("Estou na página {string}", (page: string) => {
    cy.visit(page);
  });

  When("Preencho o campo {string} com {string}, o campo {string} com {string} e clico no botão {string}", (name: string, nameValue: string, email: string, emailValue: string, button: string) => {
    cy.getDataCy(name).type(nameValue);
    cy.getDataCy(email).type(emailValue);
    cy.getDataCy(button).click();
  });

  Then("Eu permaneço na página de {string}", (page: string) => {
    cy.url().should("include", page);
  });

  //Visualizar entregadores

  Given(
    "Eu estou em {string} com o entregador {string} criado",
    (page: string) => {
      cy.visit(page);
    }
  );

  Then(
    "Eu devo ver o entregador {string}",
    (name: string) => {
      cy.getDataCy(`deliveryman-${name}`).should("contain", name);
    }
  );

  //Remoção de um entregador armazenado por ID

  Given("Me encontro na página {string}", (page: string) => {
    cy.visit(page);
  });

  When("Clico no botão {string}", (button: string) => {
    cy.getDataCy(button).click();
  });

  Then("Devo estar na página {string}", (page: string) => {
    cy.url().should("include", page);
  });

  