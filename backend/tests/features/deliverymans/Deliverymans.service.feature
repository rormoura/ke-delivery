Feature: Cadastro e manutenção de entregadores 
    As a stakeholder
    I want to create, read, update and delete the deliverymans of my application
    So that i can provide more information about who is getting de order delivered

    Scenario: Create deliveryman
        Given o método createDeliveryman chamado com {id: "2", name: "Matheus", email: "mamath@gmail.com", numOrders: "0", numRates: "0"} do DeliverymanService retorna um entregador de id "2", nome "Matheus", email "mamath@gmail.com" numOrders: "0" e numRates: "0"
        When o método createDeliveryman é chamado para criar o entregador "Matheus", de id "2", email "mamath@gmail.com", numOrders "0" e numRates: "0"
        Then a promoção retornada deve ter id "2", nome "QFOMEBB" e desconto "25%"

    Scenario: Read all deliverymans
        Given o método getDeliverymans do DeliverymanService retorna um array com as promoções {id: "3", name: "40TAO", discount: "40%"} e {id: "4", name: "10BARRA10", discount: "10%"}
        When o método getDeliverymans é chamado
        Then o array retornado deve conter as promoções {id: "3", name: "40TAO", discount: "40%"} e {id: "4", name: "10BARRA10", discount: "10%"}

    Scenario: Update deliveryman name
        Given o método updateDeliveryman chamado com "DIADOSPAIS" e "{id: "1", name: "20%OFF", discount: "20%"}" do DeliverymanService retorna uma promoção de id "1", nome "20%OFF" e desconto "20%"
        When o método updateDeliveryman é chamado para atualizar o nome da promoção "DIADOSPAIS", de id "1" e desconto "20%", para "20%OFF"
        Then a promoção retornada deve ter id "1", nome "20%OFF" e desconto "20%"

    Scenario: Delete deliveryman
        Given o método deleteDeliveryman chamado com "BLACKFRIDAY" do DeliverymanService não realiza retorno
        When o método deleteDeliveryman é chamado para remover a promoção "BLACKFRIDAY"
        Then nada deve ser retornado