Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

    Scenario: Update credit card payment method name
        Given o método updateCreditCardPaymentMethod chamado com "Cartão de Crédito MASTERCARD" e "{id: "1", name: "Cartão de Crédito ELO", cardNumber: "1234567", cardHolderName: "Steve Rogers", cvv: "455", expirationDate: "31/02/2033", default: "no"}" do CreditCardPaymentMethodService retorna um cartão de crédito de id: "1", name: "Cartão de Crédito ELO", cardNumber: "1234567", cardHolderName: "Steve Rogers", cvv: "455", expirationDate: "31/02/2033", default: "no"
        When o método updateCreditCardPaymentMethod é chamado para atualizar o nome do cartão de crédito "Cartão de Crédito MASTERCARD" de id: "1", cardNumber: "1234567", cardHolderName: "Steve Rogers", cvv: "455", expirationDate: "31/02/2033", default: "no" para "Cartão de Crédito ELO"
        Then o cartão de crédito retornado deve ter id: "1", name: "Cartão de Crédito ELO", cardNumber: "1234567", cardHolderName: "Steve Rogers", cvv: "455", expirationDate: "31/02/2033", default: "no"

    Scenario: Create credit card payment method
        Given o método createCreditCardPaymentMethod chamado com "{id: "2", name: "Cartão de Crédito VISA", cardNumber: "7654321", cardHolderName: "John Bunyan", cvv: "553", expirationDate: "17/07/2025", default: "no"}" do CreditCardPaymentMethodService retorna um cartão de crédito de id: "2", name: "Cartão de Crédito VISA", cardNumber: "7654321", cardHolderName: "John Bunyan", cvv: "553", expirationDate: "17/07/2025", default: "no"
        When o método createCreditCardPaymentMethod é chamado para criar o cartão de crédito "Cartão de Crédito VISA", de id "2", cardNumber: "7654321", cardHolderName: "John Bunyan", cvv: "553", expirationDate: "17/07/2025", default "no"
        Then o cartão de crédito retornado deve ter id "2", nome "Cartão de Crédito VISA", cardNumber: "7654321", cardHolderName: "John Bunyan", cvv: "553", expirationDate: "17/07/2025", default "no"

    Scenario: Return all credit card payment methods
        Given o método getCreditCardPaymentMethods do CreditCardPaymentMethodService retorna um array com os cartões de crédito "{id: "3", name: "Cartão de Crédito AMEX", cardNumber: "9830634", cardHolderName: "Edith", cvv: "991", expirationDate: "18/08/2026", default: "no"}" e "{id: "4", name: "Cartão de Crédito MASTERCARD", cardNumber: "3434735", cardHolderName: "Schaeffer", cvv: "199", expirationDate: "01/01/2031", default: "no"}"
        When o método getCreditCardPaymentMethods é chamado
        Then o array retornado deve conter os cartões de crédito "{id: "3", name: "Cartão de Crédito AMEX", cardNumber: "9830634", cardHolderName: "Edith", cvv: "991", expirationDate: "18/08/2026", default: "no"}" e "{id: "4", name: "Cartão de Crédito MASTERCARD", cardNumber: "3434735", cardHolderName: "Schaeffer", cvv: "199", expirationDate: "01/01/2031", default: "no"}"
    
    Scenario: Delete credit card payment method
        Given o método deleteCreditCardPaymentMethod chamado com "Cartão de Crédito VISA" do CreditCardPaymentMethodService não realiza retorno
        When o método deleteCreditCardPaymentMethod é chamado para remover o cartão de crédito "Cartão de Crédito VISA"
        Then nada deve ser retornado