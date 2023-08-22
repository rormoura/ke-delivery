Feature: Cadastro e manutenção de entregadores 
    As a stakeholder
    I want to create, read, update and delete the deliverymans of my application
    So that i can provide more information about who is getting de order delivered

    @create
    Scenario: Create deliveryman
        Given o método createDeliveryman chamado com {id: "2", name: "Matheus", email: "mamath@gmail.com", numOrders: "0", numRates: "0"} do DeliverymanService retorna um entregador de id "2", nome "Matheus", email "mamath@gmail.com" numOrders: "0" e numRates: "0"
        When o método createDeliveryman é chamado para criar o entregador "Matheus", de id "2", email "mamath@gmail.com", numOrders "0" e numRates: "0"
        Then o entregador retornado deve ter nome "Matheus", id "2", email "mamath@gmail.com", numOrders "0" e numRates: "0"

    Scenario: Read all deliverymans
        Given o método getDeliverymans do DeliverymanService retorna um array com os entregadores {id: "3", name: "Marcos", email: "marco@gmail.com", numOrders: "0", numRates: "0"} e {id: "4", name: "Lucas", email: "luke@gmail.com", numOrders: "0", numRates: "0"}
        When o método getDeliverymans é chamado
        Then o array retornado deve conter os entregadores {id: "3", name: "Marcos", email: "marco@gmail.com", numOrders: "0", numRates: "0"} e {id: "4", name: "Lucas", email: "luke@gmail.com", numOrders: "0", numRates: "0"}

    Scenario: Update deliveryman name
        Given o método updateDeliveryman chamado com "1" e {id: "1", name: "Atos", email: "tos@gmail.com", numOrders: "0", numRates: "0"} do DeliverymanService retorna um entregador de id "1", nome "Atos", email "tos@gmail.com", numOrders: "0" e numRates: "0"
        When o método updateDeliveryman é chamado para atualizar o nome do entregador "Antonio", de id "1", email "tos@gmail.com", numOrders: "1" e numRates: "0"
        Then o entregador retornado deve ter id "1", nome "Atos", email "tos@gmail.com", numOrders: "0" e numRates: "0"

    Scenario: Delete deliveryman
        Given o método deleteDeliveryman chamado com "3" do DeliverymanService não realiza retorno
        When o método deleteDeliveryman é chamado para remover o entregador com id "3"
        Then nada deve ser retornado