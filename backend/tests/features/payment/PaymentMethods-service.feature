Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

    Scenario: Return default payment method
        Given o método getDefaultPaymentMethod do PaymentMethodsService retorna o método de pagamento "{id: "2", name: "Cartão de Crédito VISA", cardNumber: "7654321", cardHolderName: "John Bunyan", cvv: "553", expirationDate: "17/07/2025", default: "yes"}"
        When o método getDefaultPaymentMethod é chamado
        Then o método de pagamento retornado deve ser "{id: "2", name: "Cartão de Crédito VISA", cardNumber: "7654321", cardHolderName: "John Bunyan", cvv: "553", expirationDate: "17/07/2025", default: "yes"}"

    #Scenario: Update default payment method
    #    Given o método updateDefaultPaymentMethod do PaymentMethodsService chamado com "Pix" retorna o método de pagamento "{id: "2", name: "Pix", default: "yes"}"
    #   When o método updateDefaultPaymentMethod é chamado com "Pix"
    #    Then o método de pagamento retornado deve ser "{id: "2", name: "Pix", default: "yes"}"