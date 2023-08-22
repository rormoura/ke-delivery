Feature: Cadastro e manutenção de clientes

    Scenario: Create customer
        Given o método createCustomer chamado com id: "2", name: "AAAAA", email: "mneto8978@gmail.com", cpf: "11122233312",address: "olinda", password: "qqqww" do CustomerService retorna um Customer com id "2", name "AAAAA", email "mneto8978@gmail.com", cpf "11122233312", address "olinda" e password "qqqww"
        When o método createCustomer é chamado para criar o customer com id "2", name "AAAAA", email "mneto8978@gmail.com", cpf "11122233312", address "olinda" e password "qqqww"
        Then o customer retornado deve ter id "2", name "AAAAA", email "mneto8978@gmail.com", cpf "11122233312", address "olinda" e password "qqqww"
    Scenario: Delete Customer
        Given o método deleteCustomer chamado com "123345123123" do CustomerService não realiza retorno
        When o método deleteCustomer é chamado para deletar o customer com id "123345123123"
        Then o customer com id "123345123123" não deve existir



