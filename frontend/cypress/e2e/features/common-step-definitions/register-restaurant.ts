import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";


// Given: common-step-definitions.ts
When(
  "Eu preencho o campo {string} = {string}, {string} = {string}, {string} = {string}, {string} = {string}, {string} = {string}, {string} = {string}, {string} = {string}, {string} = {string}, {string} = {string}, {string} = {string} e clico no botão {string}", 
  (fieldTypeBusiness: string, typeBusiness: string, 
  fieldResponsibleName: string, responsibleName: string,
  fieldResponsibleCPF: string, responsibleCPF: string,
  fieldEmail: string, email: string,
  fieldPhone: string, phone: string,
  fieldPassword: string, password: string,
  fieldPhoneRestaurant: string, phoneRestaurant: string,
  fieldRestaurantName: string, restaurantName: string,
  fieldCNPJ: string, CNPJ: string,
  fieldSpeciality: string, speciality: string,
  button: string
  ) => {
    cy.getDataCy(fieldTypeBusiness).type(typeBusiness);
    cy.getDataCy(fieldResponsibleName).type(responsibleName);
    cy.getDataCy(fieldResponsibleCPF).type(responsibleCPF);
    cy.getDataCy(fieldEmail).type(email);
    cy.getDataCy(fieldPhone).type(phone);
    cy.getDataCy(fieldPassword).type(password);
    cy.getDataCy(fieldPhoneRestaurant).type(phoneRestaurant);
    cy.getDataCy(fieldRestaurantName).type(restaurantName);
    cy.getDataCy(fieldCNPJ).type(CNPJ);
    cy.getDataCy(fieldSpeciality).type(speciality);
    cy.getDataCy(button).click();
  }
)
Then(
  "Eu sou redirecionado para página {string}", (page: string) => {
    cy.url().should("include", page);
  }
);

