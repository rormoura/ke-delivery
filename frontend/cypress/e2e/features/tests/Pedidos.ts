import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Visualizar tests
Given(
    "Eu entrei na página de {string}", (page: string) => {
        cy.visit(page);
    }
);

When("Eu aperto no botão {string}", (button: string) => {
  cy.getDataCy(button).click();
});

Then("Eu alcanço a página de {string}", (page: string) => {
    cy.url().should("include", page);
});


//Testando carrinho
Given(
    "Eu cheguei na página {string}", (page: string) => {
        cy.visit(page);
    }
);

Given(
    "o carrinho tem visibilidade = {string}", (value: string) => {
        cy.getDataCy('Visible').should('contain', value);
    }
);

When("Eu aperto o botão {string}", (button: string) => {
    cy.getDataCy(button).click();
});

Then("a visibilidade do carrinho vai para {string}", (value: string) => {
    cy.getDataCy('Visible').should('have.text', value);
});

//Adicionar um novo pedido no carrinho
Given(
    "Estamos na página {string}", (page: string) => {
        cy.visit(page);
    }
);

Given(
    "a visibilidade do carrinho é = {string}", (value: string) => {
        cy.getDataCy('Visible').should('contain', value);
    }
);

When("Eu clico em {string} para adicionar um item", (button: string) => {
    cy.getDataCy(button).click({ multiple: true, force: true });
});

Then("a quantidade de itens no carrinho é maior que {int}", (value: number) => {
    cy.getDataCy('qtdItems').invoke('text').then(parseFloat).should('be.gt', value)
});


//Aumentar as quantidades dos pedidos no carrinho
Given(
    "Fomos para a página {string}", (page: string) => {
        cy.visit(page);
    }
);

Given("Eu clico em {string} para adicionar novo item", (button: string) => {
    cy.getDataCy(button).click({ multiple: true, force: true });
});

When("Eu uso o botão {string}", (button: string) => {
    cy.getDataCy(button).click();
});

When("Eu aperto em {string} para aumentar a quantidade de itens", (button: string) => {
    cy.getDataCy(button).click({ multiple: true, force: true });
});

Then("a quantidade de itens no carrinho é superior a {int}", (value: number) => {
    cy.getDataCy('qtdItems').invoke('text').then(parseFloat).should('be.gt', value)
});

//Diminuir as quantidades dos pedidos no carrinho
Given(
    "Chegamos em {string}", (page: string) => {
        cy.visit(page);
    }
);

Given("Eu clico em {string} para colocar um novo item", (button: string) => {
    cy.getDataCy(button).click({ multiple: true, force: true });
});

Given("Eu clico novamente em {string} para colocar um novo item", (button: string) => {
    cy.getDataCy(button).click({ multiple: true, force: true });
});

When("Eu pressiono o botão {string}", (button: string) => {
    cy.getDataCy(button).click();
});

When("Eu aperto em {string} para diminuir a quantidade de itens", (button: string) => {
    cy.getDataCy(button).click({ multiple: true, force: true });
});

Then("a quantidade de itens no carrinho é inferior a {int}", (value: number) => {
    cy.getDataCy('qtdItems').invoke('text').then(parseFloat).should('be.lt', value)
});
