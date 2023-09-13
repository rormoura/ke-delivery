import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


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

    Given("que eu estou na pagina {string}", (page: string) => {
      cy.visit(page);
    });
    
    When("Eu vejo o cliente que tem o campo {string} com cpf {string} e clico no botão {string}", (cpfPainel: string, cpf: string, botonPainel: string) => {
      cy.getDataCy(cpfPainel).contains(cpf);
      cy.getDataCy(botonPainel).click();
    });
    
    Then("vejo a indicação que o cliente foi deletado {string}", (popupPainel: string) => {
      cy.getDataCy(popupPainel).should("be.visible");
    });
    

    