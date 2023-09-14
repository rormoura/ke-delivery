Feature: Cadastro de entregadores
    Como stakeholder
    Eu quero ter registro dos entregadores
    Para que eu possa agregar mais informações a entregas feitas na plataforma

    Scenario: Cadastro de entregador com sucesso
        Given Eu me encontro na página "novoEntregador"
        When Eu preencho o campo "name" com "Matheus", o campo "email" com "matheusinh@gmail.com.br" ,o campo "numOrders" com "3" e clico no botão "cadastro"
        Then Eu devo estar na página "entregadores"

    Scenario: Cadastro de entregador faltando campos
        Given Estou na página "novoEntregador"
        When Preencho o campo "name" com "Matheus", o campo "email" com "matheusinh@gmail.com.br" e clico no botão "cadastro"
        Then Permaneço na página "novoEntregador"
    
    Scenario: Visualizar entregadores
        Given Eu estou em "entregadores" com o entregador "Matheus" criado
        Then Eu devo ver o entregador "Matheus"

    Scenario: Remoção de um entregador armazenado por ID
        Given Me encontro na página "entregadores"
        When Clico no botão "excluir"
        Then Devo estar na página "entregadores"