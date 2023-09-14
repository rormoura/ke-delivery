import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

// Login realizado com sucesso
// Given(
//   "Eu estou na página {string}", (page: string) => {
//     cy.visit(page);
//   }
// );
// Given: common-step-definitions.ts
When(
  "Eu preencho o campo {string} com {string}, o campo {string} com {string} e clico no botão {string}", 
  (fieldEmail: string, email: string, fieldPassword: string, password: string, button: string) => {
    cy.getDataCy(fieldEmail).type(email);
    cy.getDataCy(fieldPassword).type(password);
    cy.getDataCy(button).click();
  }
);

Then(
  " Eu devo logar na página {string}", (page: string) => {
    cy.url().should("include", page);
  }
);

// Login com campo vazio

// Given(
//   "Eu estou na página {string}", (page: string) => {
//     cy.visit(page);
//   }
// );
// Given: common-step-definitions.ts

When(
  "Eu preencho o campo {string} com {string} e clico no botão {string}", 
  (fieldEmail: string, email: string, fieldPassword: string, password: string, button: string) => {
    cy.getDataCy(fieldEmail).type(email);
    cy.getDataCy(fieldPassword).type(password);
    cy.getDataCy(button).click();
  }
);

Then(
  "Eu permaneço na página {string}", (page: string) => {
    cy.url().should("include", page);
  }
);