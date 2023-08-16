Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

    Scenario: Update cash payment method name
        Given o método updateCashPaymentMethod chamado com "Dinheiro" e "{id: "1", name: "Dinheiro da Conta Corrente", default: "no"}" do CashPaymentMethodService retorna um método de pagamento em dinheiro de id "1", nome "Dinheiro da Conta Corrente" e default "no"
        When o método updateCashPaymentMethod é chamado para atualizar o nome do método de pagamento em dinheiro "Dinheiro", de id "1" e default "no", para "Dinheiro da Conta Corrente"
        Then o método de pagamento em dinheiro retornado deve ter id "1", nome "Dinheiro da Conta Corrente" e default "no"

    Scenario: Create cash payment method
        Given o método createCashPaymentMethod chamado com "{id: "2", name: "Dinheiro sacado no Banco do Brasil", default: "no"}" do CashPaymentMethodService retorna um método de pagamento em dinheiro de id "2", nome "Dinheiro sacado no Banco do Brasil" e default "no"
        When o método createCashPaymentMethod é chamado para criar o método de pagamento em dinheiro "Dinheiro sacado no Banco do Brasil", de id "2" e default "no"
        Then o método de pagamento em dinheiro retornado deve ter id "2", nome "Dinheiro sacado no Banco do Brasil" e default "no"

    Scenario: Return all cash payment methods
        Given o método getCashPaymentMethods do CashPaymentMethodService retorna um array com os métodos de pagamento em dinheiro "{id: "3", name: "Dinheiro da Conta Corrente Bradesco", default: "no"}" e "{id: "4", name: "Dinheiro sacado no Banco do Brasil", default: "no"}"
        When o método getCashPaymentMethods é chamado
        Then o array retornado deve conter os métodos de pagamento em dinheiro "{id: "3", name: "Dinheiro da Conta Corrente Bradesco", default: "no"}" e "{id: "4", name: "Dinheiro sacado no Banco do Brasil", default: "no"}"
    
    Scenario: Delete cash payment method
        Given o método deleteCashPaymentMethod chamado com "Dinheiro" do CashPaymentMethodService não realiza retorno
        When o método deleteCashPaymentMethod é chamado para remover o método de pagamento em dinheiro "Dinheiro"
        Then nada deve ser retornado