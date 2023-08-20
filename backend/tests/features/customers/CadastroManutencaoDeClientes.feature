Feature: Cadastro e manutenção de clientes


    Scenario: Cadastro de cliente faltando alguma informação
        Given Eu estou na página de "Cadastro de cliente"
        And Eu vejo os campos das credenciais a serem preenchidas
        When Eu escrevo o nome "Mário Mota", o e-mail "mmln@cin.com.br" , a senha "sudoku123!", o cpf "06178145598" e salvo
        Then Eu permaneço na página de "Cadastro de cliente"
        And Eu vejo uma mensagem de que esta faltando informações a serem preenchidas
        And permaneço na pagina de "Cadastro de client"


    Scenario: Cadastro de cliente realizado com sucesso
        Given Eu estou na página de "Cadastro de cliente"
        And Eu vejo os campos das credenciais a serem preenchidas
        When Eu escrevo o nome "Mário Mota", o e-mail "mmln@cin.com.br" , a senha "sudoku123!", o cpf "06178145598" e salvo
        Then Eu permaneço na página de "Cadastro de cliente"
        And Eu vejo uma mensagem de operação bem sucedida
        And sou encaminhado para a pagina "home"

    @runThis
    Scenario: Cadastrar cliente
        Given Costumers contém um costumer com JSON contendo id = "0001", name = "Mario", email = "mneto@gmail.com", cpf = "654.243.312.11", address = "Rua das Flores, 432, Váezea, Recife, Pernambuco, Brasil" e password = "chiquititas123"
        When uma requisição "POST" for enviada para "customers" com o corpo da requisição contendo id = "0002", name = "Mota", email = "mmmm@gmail.com", cpf = "111.333.312.11", address = "Rua dos soldados, 120, Váezea, Recife, Pernambuco, Brasil" e password = "carlinhos333"
        Then o status da resposta deve ser "200" e o JSON da resposta deve conter o id = "0002", name = "Mota", email = "mmmm@gmail.com", cpf = "111.333.312.11", address = "Rua dos soldados, 120, Váezea, Recife, Pernambuco, Brasil" e password = "carlinhos333"



