Feature: Cadastro e manutenção de clientes


    @runThis
    Scenario: Cadastrar cliente
        Given O sistema contém um costumer com JSON contendo id = "0001", name = "Mario", email = "mneto@gmail.com", cpf = "654.243.312.11", address = "Rua das Flores, 432, Váezea, Recife, Pernambuco, Brasil" e password = "chiquititas123"
        When uma requisição "POST" for enviada para "customers" com o corpo da requisição contendo id = "0002", name = "Mota", email = "mmmm@gmail.com", cpf = "111.333.312.11", address = "Rua dos soldados, 120, Váezea, Recife, Pernambuco, Brasil" e password = "carlinhos333"
        Then o status da resposta deve ser "200" e o JSON da resposta deve conter o id = "0002", name = "Mota", email = "mmmm@gmail.com", cpf = "111.333.312.11", address = "Rua dos soldados, 120, Váezea, Recife, Pernambuco, Brasil" e password = "carlinhos333"
