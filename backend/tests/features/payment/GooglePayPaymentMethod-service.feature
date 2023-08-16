Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

    Scenario: Update google pay payment method name
        Given o método updateGooglePayPaymentMethod chamado com "GooglePay conta trabalho" e "{id: "1", name: "GooglePay conta pessoal", default: "no"}" do GooglePayPaymentMethodService retorna um método de pagamento google pay de id "1", nome "GooglePay conta pessoal" e default "no"
        When o método updateGooglePayPaymentMethod é chamado para atualizar o nome do método de pagamento "GooglePay conta trabalho", de id "1" e default "no", para "GooglePay conta pessoal"
        Then o método de pagamento google pay retornado deve ter id "1", nome "GooglePay conta pessoal" e default "no"

    Scenario: Create google pay payment method
        Given o método createGooglePayPaymentMethod chamado com "{id: "2", name: "GooglePay conta Rodrigo", default: "no"}" do GooglePayPaymentMethodService retorna um método de pagamento em dinheiro de id "2", nome "GooglePay conta Rodrigo" e default "no"
        When o método createGooglePayPaymentMethod é chamado para criar o método de pagamento "GooglePay conta Rodrigo", de id "2" e default "no"
        Then o método de pagamento google pay retornado deve ter id "2", nome "GooglePay conta Rodrigo" e default "no"

    Scenario: Return all google pay payment methods
        Given o método getGooglePayPaymentMethods do GooglePayPaymentMethodService retorna um array com os métodos de pagamento "{id: "3", name: "GooglePay conta Diego", default: "no"}" e "{id: "4", name: "GooglePay conta Julia", default: "no"}"
        When o método getGooglePayPaymentMethods é chamado
        Then o array retornado deve conter os métodos de pagamento "{id: "3", name: "GooglePay conta Diego", default: "no"}" e "{id: "4", name: "GooglePay conta Julia", default: "no"}"
    
    Scenario: Delete google pay payment method
        Given o método deleteGooglePayPaymentMethod chamado com "GooglePay conta Lurdes" do GooglePayPaymentMethodService não realiza retorno
        When o método deleteGooglePayPaymentMethod é chamado para remover o método de pagamento "GooglePay conta Lurdes"
        Then nada deve ser retornado