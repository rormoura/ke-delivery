import { Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
    //Scenario: Remoção de método de pagamento realizada com sucesso
    //given o usuário está na página tal
  
  Given('possui os métodos de pagamento {string}, {string}, {string}',
  (cartao1: string, googlePay:string, cartao2: string) => {
    cy.getDataCy("adicionarCartao").click();
    cy.getDataCy("nomeModalCartao").type(cartao1);
    cy.getDataCy("titularModalCartao").type("MARIA SILVA");
    cy.getDataCy("numeroModalCartao").type("123");
    cy.getDataCy("validadeModalCartao").type("2010-10-10");
    cy.getDataCy("cvvModalCartao").type("101");
    cy.getDataCy("adicionarModalCartao").click();

    cy.getDataCy("adicionarGooglePay").click();
    cy.getDataCy("nomeModalComum").type(googlePay);
    cy.getDataCy("adicionarModalComum").click();
    
    cy.getDataCy("adicionarCartao").click();
    cy.getDataCy("nomeModalCartao").type(cartao2);
    cy.getDataCy("titularModalCartao").type("MARIA SILVA");
    cy.getDataCy("numeroModalCartao").type("456");
    cy.getDataCy("validadeModalCartao").type("2020-10-10");
    cy.getDataCy("cvvModalCartao").type("202");
    cy.getDataCy("adicionarModalCartao").click();
  });
  
  When('a usuária {string} remove o método de pagamento {string}', (usuario: string, metodo: string) => {
    cy.getDataCy("remover"+metodo).click();
  });
  
  //then o usuário permanece na página tal
  
  Then('vê uma mensagem que indica que a operação foi realizada com sucesso', () => {
    cy.on("window:alert", (str) => {
        expect(str).to.contain("foi removido corretamente");
      });
  });
  
  Then('vê somente os métodos de pagamento {string}, {string}', (metodo1: string, metodo2: string) => {
    cy.getDataCy("metodosDisponiveis").should("contain", metodo1);
    cy.getDataCy("metodosDisponiveis").should("contain", metodo2);
  });


//

    //Scenario: Modificação do método de pagamento padrão realizada com sucesso
  //given o usuário está na página tal

  Given('possui os métodos de pagamento {string}', (metodo1: string) => {
    //passo implementado no cenário anterior
  });

  Given('{string}, o qual é o método de pagamento padrão', (metodo2: string) => {
    //passo parcialmente implementado no cenário anterior
    cy.getDataCy("definirPadrao"+metodo2).click();
  });

  When('a usuária {string} escolhe {string} como o novo método de pagamento padrão', (usuario: string, metodo1: string) => {
    cy.getDataCy("definirPadrao"+metodo1).click();
  });

  //then o usuário permanece na página tal

  Then('vê uma mensagem que indica que o método de pagamento padrão foi definido com sucesso', () => {
    cy.on("window:alert", (str) => {
        expect(str).to.contain("foi definido como padrão com sucesso");
    })
    });

    Then('vê somente os métodos de pagamento {string}, {string}, este último é o método de pagamento padrão', (metodo2: string, metodo1: string) => {
        cy.getDataCy("metodosDisponiveis").should("contain", metodo1+" (Padrão: Sim)");
        cy.getDataCy("metodosDisponiveis").should("contain", metodo2+" (Padrão: Não)");
    });


//

    //Scenario: Adição do método de pagamento realizada com sucesso
    //given o usuário está na página tal

    Given('possui os métodos de pagamento {string}, {string}', (metodo1: string, metodo2: string) => {
        //passo implementado no cenário anterior
    });

    When('a usuária {string} adiciona o método de pagamento {string}', (usuario: string, novoMetodo: string) => {
        cy.getDataCy("adicionarPix").click();
        cy.getDataCy("nomeModalComum").type(novoMetodo);
        cy.getDataCy("adicionarModalComum").click();
    });

    //then o usuário permanece na página tal

    Then('vê uma mensagem que indica que o método foi adicionado com sucesso', () => {
        cy.on("window:alert", (str) => {
            expect(str).to.contain("adicionado com sucesso");
        })
    });

    Then('vê somente os métodos de pagamento {string}, {string}, {string}', (metodo1: string, metodo2: string, metodo3: string) => {
        cy.getDataCy("metodosDisponiveis").should("contain", metodo1);
        cy.getDataCy("metodosDisponiveis").should("contain", metodo2);
        cy.getDataCy("metodosDisponiveis").should("contain", metodo3);
    });


//

    //Scenario: Tentativa de adição de método de pagamento com informações incompletas
    //given o usuário está na página tal

    Given('possui somente os métodos de pagamento {string}, {string}, {string}', (metodo1: string, metodo2: string, metodo3: string) => {
        //passo implementado no cenário anterior
    });

    When('a usuária {string} adiciona o método de pagamento {string} com "número do cartão"={string}, "validade"={string}, "CVV"={string}, "nome do titular"={string}', (usuario: string, novoCartao: string, numeroCartao: string, validade: string, cvv: string, titular: string) => {
        cy.getDataCy("adicionarCartao").click();
        cy.getDataCy("nomeModalCartao").type(novoCartao);
        cy.getDataCy("titularModalCartao").type(titular);
        cy.getDataCy("numeroModalCartao").type(numeroCartao);
        cy.getDataCy("validadeModalCartao").type(validade);
        cy.getDataCy("cvvModalCartao").clear();
        cy.getDataCy("adicionarModalCartao").click();
    });

    //then o usuário permanece na página tal

    Then('vê uma mensagem que indica a impossibilidade de adicionar o método de pagamento {string} pois está incompleto', (novoCartao: string) => {
        cy.on("window:alert", (str) => {
            expect(str).to.contain("incomplete");
        })
    });

    Then('vê somente os 3 métodos de pagamento {string}, {string}, {string}', (metodo1: string, metodo2: string, metodo3: string) => {
        cy.getDataCy("metodosDisponiveis").should("contain", metodo1);
        cy.getDataCy("metodosDisponiveis").should("contain", metodo2);
        cy.getDataCy("metodosDisponiveis").should("contain", metodo3);
    });


//

    //Scenario: Tentativa de atualização de método de pagamento
    //given o usuário está na página tal

    Given('possui somente os 3 métodos de pagamento {string}, {string}, {string}', (metodo1: string, metodo2: string, metodo3: string) => {
        //passo implementado no cenário anterior
    });

    When('a usuária {string} atualiza "nome do titular" do método de pagamento {string} para {string}', (usuario: string, nomeCartao: string, novoTitular: string) => {
        cy.getDataCy("atualizar"+nomeCartao).click();
        cy.getDataCy("titularUpdateModalCartao").clear();
        cy.getDataCy("atualizarUpdateModalCartao").click();
    });

    //then o usuário permanece na página tal

    Then('vê uma mensagem que indica a impossibilidade de altualizar o método de pagamento {string}, pois está incompleto', (nomeCartao: string) => {
        cy.on("window:alert", (str) => {
            expect(str).to.contain("incomplete");
        })
    });

    Then('continua vendo somente os métodos de pagamento {string}, {string}, {string} inalterados', (metodo1: string, metodo2: string, metodo3: string) => {
        cy.getDataCy("metodosDisponiveis").should("contain", metodo1);
        cy.getDataCy("metodosDisponiveis").should("contain", metodo2);
        cy.getDataCy("metodosDisponiveis").should("contain", metodo3);
    });