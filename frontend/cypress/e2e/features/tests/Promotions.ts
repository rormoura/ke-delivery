import { Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

    //Scenario: Adição de promoção realizada com sucesso
    //given o restaurante está na página tal
  
  Given('o restaurante {string} de id {string} possui somente a promoção {string}, a qual aplica {string} de desconto',
  (restaurante: string, idRestaurante: string, nomePromo:string, descontoPromo: string) => {
    cy.getDataCy("adicionarPromocao").click();
    cy.getDataCy("idModal").type(idRestaurante);
    cy.getDataCy("nomeModal").type(nomePromo);
    cy.getDataCy("discountModal").type(descontoPromo);
    cy.getDataCy("adicionarModal").click();
  });
  
  When('o restaurante {string} de id {string} adiciona a promoção {string}, a qual aplica {string} de desconto',
  (restaurante: string, idRestaurante: string, nomePromo:string, descontoPromo: string) => {
    cy.getDataCy("adicionarPromocao").click();
    cy.getDataCy("idModal").type(idRestaurante);
    cy.getDataCy("nomeModal").type(nomePromo);
    cy.getDataCy("discountModal").type(descontoPromo);
    cy.getDataCy("adicionarModal").click();
  });
  
  //then o restaurante permanece na página tal
  
  Then('vê uma mensagem que indica que a adição foi realizada com sucesso', () => {
    cy.on("window:alert", (str) => {
        expect(str).to.contain("adicionada com sucesso");
      });
  });
  
  Then('vê a promoção {string}, a qual aplica {string} de desconto',
  (nomePromo: string, descontoPromo: string) => {
    cy.getDataCy("promocoesDisponiveis").should("contain", nomePromo+" (Desconto: "+descontoPromo+")");
  });

  Then('a promoção {string}, a qual aplica {string} de desconto',
  (nomePromo: string, descontoPromo: string) => {
    cy.getDataCy("promocoesDisponiveis").should("contain", nomePromo+" (Desconto: "+descontoPromo+")");
  });


//

    //Scenario: Tentativa de adição de promoção já existente
  //given o restaurante está na página tal

  Given('o restaurante {string} de id {string} possui somente as promoções: 1 - {string}, a qual aplica {string} de desconto, 2 - {string}, a qual aplica {string} de desconto',
  (restaurante: string, idRestaurante: string, nomePromo1: string, descontoPromo1: string, nomePromo2: string, descontoPromo2: string) => {
    //passo implementado no cenário anterior
  });

  When('o restaurante {string} de id {string} cria a promoção {string}, a qual aplica {string} de desconto',
  (restaurante: string, idRestaurante: string, nomePromo: string, descontoPromo: string) => {
    cy.getDataCy("adicionarPromocao").click();
    cy.getDataCy("idModal").type(idRestaurante);
    cy.getDataCy("nomeModal").type(nomePromo);
    cy.getDataCy("discountModal").type(descontoPromo);
    cy.getDataCy("adicionarModal").click();
  });

  //then o restaurante permanece na página tal

  Then('vê uma mensagem que indica a impossibilidade de adicionar a promoção {string} novamente', (nomePromo: string) => {
    cy.on("window:alert", (str) => {
        expect(str).to.contain("Promotion already exists");
    })
    });

    Then('vê somente as promoções: 1 - {string}, a qual aplica {string} de desconto, 2 - {string}, a qual aplica {string} de desconto',
    (nomePromo1: string, descontoPromo1: string, nomePromo2: string, descontoPromo2: string) => {
        cy.getDataCy("promocoesDisponiveis").should("contain", nomePromo1+" (Desconto: "+descontoPromo1+")");
        cy.getDataCy("promocoesDisponiveis").should("contain", nomePromo2+" (Desconto: "+descontoPromo2+")");
    });


//

    //Scenario: Remoção de promoção realizada com sucesso
    //given o restaurante está na página tal

    Given('o restaurante {string} de id {string} possui somente as 2 promoções: 1 - {string}, a qual aplica {string} de desconto, 2 - {string}, a qual aplica {string} de desconto',
    (restaurante: string, idRestaurante: string, nomePromo1: string, descontoPromo1: string, nomePromo2: string, descontoPromo2: string) => {
    //passo implementado no cenário anterior
  });

    When('o restaurante {string} remove a promoção {string}',
    (restaurante: string, nomePromo: string) => {
        cy.getDataCy("remover"+nomePromo).click();
    });

    //then o restaurante permanece na página tal

    Then('vê uma mensagem que indica que a remoção foi realizada com sucesso', () => {
        cy.on("window:alert", (str) => {
            expect(str).to.contain("removida corretamente.");
        })
    });

    Then('vê somente a promoção {string}, a qual aplica {string} de desconto', 
    (nomePromo: string, descontoPromo: string) => {
        cy.getDataCy("promocoesDisponiveis").should("contain", nomePromo+" (Desconto: "+descontoPromo+")");
    });


//

    //Scenario: Atualização de promoção realizada com sucesso
    //given o restaurante está na página tal

    Given('o restaurante {string} de id {string} possui somente a promoção: {string}, a qual aplica {string} de desconto', 
    (restaurante: string, idRestaurante: string, nomePromo: string, descontoPromo: string) => {
        //passo implementado no cenário anterior
    });

    When('o restaurante {string} de id {string} define que a promoção {string} agora aplica {string} de desconto', 
    (restaurante: string, idRestaurante: string, nomePromo: string, novoDescontoPromo: string) => {
        cy.getDataCy("atualizar"+nomePromo).click();
        cy.getDataCy("discountUpdateModal").clear();
        cy.getDataCy("discountUpdateModal").type(novoDescontoPromo);
        cy.getDataCy("atualizarUpdateModal").click();
    });

    //then o restaurante permanece na página tal

    Then('vê uma mensagem que indica que a atualização foi realizada com sucesso', () => {
        cy.on("window:alert", (str) => {
            expect(str).to.contain("atualizada corretamente.");
        })
    });

    Then('vê somente a promoção: {string}, a qual aplica {string} de desconto',
    (nomePromo: string, descontoPromo: string) => {
        cy.getDataCy("promocoesDisponiveis").should("contain", nomePromo+" (Desconto: "+descontoPromo+")");
    });