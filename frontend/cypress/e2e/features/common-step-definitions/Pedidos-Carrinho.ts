import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Adicionar item no carrinho
//Given: common-step-definitions.ts

Given(
  "Eu estou na página de {string}",(page: string) => {
    cy.visit(page);
  }
);

  When("Eu preencho o campo {string} com {string}, o campo {string} com {string} , o campo {string} com {string} ,o campo {string} com {string}, o campo {string} com {string} e clico no botão {string}", (name: string, nameValue: string, cpf: string, cpfValue: string, email: string, emailValue: string, address: string, addressValue: string, password: string, passwordValue: string, button: string) => {
    cy.getDataCy(name).type(nameValue);
    cy.getDataCy(cpf).type(cpfValue);
    cy.getDataCy(email).type(emailValue);
    cy.getDataCy(address).type(addressValue);
    cy.getDataCy(password).type(passwordValue);
    cy.getDataCy(button).click();
  });
  
    Then("Eu vou para a página de {string}", (page: string) => {
      cy.url().should("include", page);
    });

// Scenario: cadastrar cliente com erro
Given("O usuario esta na página de {string}", (page: string) => {
  cy.visit(page);
});

When("O usuario preenche o campo {string} com {string}, o campo {string} com {string} , o campo {string} com {string} ,o campo {string} com {string}, o campo {string} com {string} e clico no botão {string}", (name: string, nameValue: string, cpf: string, cpfValue: string, email: string, emailValue: string, address: string, addressValue: string, password: string, passwordValue: string, button: string) => {
  cy.getDataCy(name).type(nameValue);
  cy.getDataCy(cpf).type(cpfValue);
  cy.getDataCy(email).type(emailValue);
  cy.getDataCy(address).type(addressValue);
  cy.getDataCy(password).type(passwordValue);
  cy.getDataCy(button).click();
});

Then("Eu vejo uma indicação que não posso cadastrar alguém {string}", (popup: string) => {
  cy.getDataCy(popup).should("be.visible");
});

// Scenario: cadastrar cliente faltando campos
Given("estou na página de {string}", (page: string) => {
  cy.visit(page);
}
);

When("preencho o campo {string} com {string}, o campo {string} com {string} , o campo {string} com {string} ,o campo {string} com {string} e clico no botão {string}", (name: string, nameValue: string, cpf: string, cpfValue: string, email: string, emailValue: string, address: string, addressValue: string, button: string) => {
  cy.getDataCy(name).type(nameValue);
  cy.getDataCy(cpf).type(cpfValue);
  cy.getDataCy(email).type(emailValue);
  cy.getDataCy(address).type(addressValue);
  cy.getDataCy(button).click();
});

Then("Eu permaneço na página de {string}", (page: string) => {
  cy.url().should("include", page);
});