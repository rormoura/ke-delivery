Feature: Cadastro dos clientes


    Scenario: Cadastro de cliente com sucesso
        As a cliente
        I want to me cadastrar no site
        so that eu possa utilizar o site

        Given Eu estou na página de "cadastro-customer"
        When Eu preencho o campo "name" com "Mário Mota", o campo "cpf" com "06178145598" , o campo "email" com "mmln@cin.com.br" ,o campo "address" com "rua loucura", o campo "password" com "sudoku123!" e clico no botão "boton"
        Then Eu vou para a página de "login-customer"


    Scenario: Cadastro de cliente com cpf ja existente

        Given O usuario esta na página de "cadastro-customer"
        When O usuario preenche o campo "name" com "Mário Mota", o campo "cpf" com "06178145598" , o campo "email" com "mario@gmail.com" ,o campo "address" com "rua loucura", o campo "password" com "sudoku123!" e clico no botão "boton"
        Then Eu vejo uma indicação que não posso cadastrar alguém "popup"

    Scenario: Cadastro de cliente faltando campos

        Given eu estou na página de "cadastro-customer"
        When  preencho o campo "name" com "Mário Mota", o campo "cpf" com "06178145598" , o campo "email" com "mota@gmail.com" ,o campo "address" com "rua loucura" e clico no botão "boton"
        Then Eu permaneço na página de "cadastro-customer"