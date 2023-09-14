Feature: Login de clientes


    Scenario: Login de cliente com sucesso
        As a cliente
        I want fazer login no site
        so that eu possa utilizar o site

        Given eu estou na tela de "login-customer"
        When Eu coloco no campo "emailLogin" com "mmln@cin.com.br",o campo "passwordLogin" com "sudoku123!" e clico no botão "botonLogin"
        Then Eu vou para a tela "novoPedido"

    Scenario: Login de cliente com o email errado

        Given Estou na página de "login-customer"
        When preencho o campo "emailLogin" com "ario@gmail.com",o campo "passwordLogin" com "sudoku123!" e clico no botão "botonLogin"
        Then vejo uma indicação que não posso logar "popupLogin"

    Scenario: Login de cliente faltando digitar a senha

        Given O Usuario esta na pagina "login-customer"
        When O Usuario preenche o campo "emailLogin" com "mmln@cin.com.br" e clica no botão "botonLogin"
        Then Ele permanece na pagina "login-customer"