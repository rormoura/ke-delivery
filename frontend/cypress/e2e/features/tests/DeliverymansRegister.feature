Feature: Cadastro de entregadores
    Como stakeholder
    Eu quero ter registro dos entregadores
    Para que eu possa agregar mais informações a entregas feitas na plataforma

    Scenario: Cadastro de cliente com sucesso
        Given Eu estou na página de "novoEntregador"
        When Eu preencho o campo "name" com "Matheus", o campo "email" com "matheusinh@gmail.com.br" ,o campo "numOrders" com "3" e clico no botão "cadastro"
        Then Eu vou para a página de "entregadores"

    Scenario: Cadastro de cliente faltando campos
        Given Eu estou na página de "novoEntregador"
        When Eu preencho o campo "name" com "Matheus", o campo "email" com "matheusinh@gmail.com.br" ,o campo "numOrders" com "3" e clico no botão "cadastro"
        Then Eu permaneço na página de "novoEntregador"