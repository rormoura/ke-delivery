Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

#O cenário abaixo é testado em CashPaymentMethod.controller.steps.ts
@runThisScenarioCash
    Scenario: Remoção de método de pagamento realizada com sucesso (serviço) 
        Given o sistema contém somente 1 método de pagamento: "Dinheiro"
        When uma requisição DELETE for enviada para "/api/paymentMethods/cash/Dinheiro"
        Then o status da resposta deve ser "200"
        And o sistema não contém métodos de pagamento
#O cenário abaixo é testado em PaymentMethods.controller.steps.ts
@runThisScenarioPaymentMethods
    Scenario: Modificação do método de pagamento padrão realizada com sucesso (serviço)
        Given o sistema contém somente 2 métodos de pagamento: "Cartão de Crédito ELO", "Google Pay", este último é o método de pagamento padrão
        When uma requisição PUT for enviada para "/api/paymentMethods/default/Cartão de Crédito ELO"
        Then o status da resposta deve ser "200"
        And o sistema contém somente 2 métodos de pagamento: "Google Pay", "Cartão de Crédito ELO", este último é o método de pagamento padrão
#O cenário abaixo é testado em PixPaymentMethod.controller.steps.ts
@runThisScenarioPix
    Scenario: Adição do método de pagamento realizada com sucesso (serviço)
        Given o sistema contém somente 1 método de pagamento: "Pix"
        When uma requisição POST for enviada para "/api/paymentMethods/googlePay" com o corpo da requisição sendo um JSON com name="Google Pay", default="no"
        Then o status da resposta deve ser "200"
        And o sistema contém somente 2 métodos de pagamento: "Pix", "Google Pay"
#O cenário abaixo é testado em GooglePayPaymentMethod.controller.steps.ts
@runThisScenarioGooglePay
    Scenario: Tentativa de adição de método de pagamento com informações incompletas (serviço)
        Given o sistema contém somente 1 método de pagamento: "Google Pay"
        When uma requisição POST for enviada para "/api/paymentMethods/creditCard" com o corpo da requisição sendo um JSON com name="Cartão de Crédito ELO", cardHolderName="MARIA SILVA", cardNumber="", expirationDate="30/05/2032", cvv="101", default="no"
        Then o status da resposta deve ser "403"
        And o sistema contém somente 1 método de pagamento: "Google Pay"
#O cenário abaixo é testado em CreditCardPaymentMethod.controller.steps.ts
@runThisScenarioCreditCard
    Scenario: Tentativa de atualização de método de pagamento (serviço)
        Given o sistema contém somente 1 método de pagamento: "Cartão de Crédito VISA", com cardNumber="12345", expirationDate="09/10/2026", cvv="111", cardHolderName="MARIA SILVA"
        When uma requisição UPDATE for enviada para "/api/paymentMethods/creditCard/Cartão de Crédito VISA" com o corpo da requisição sendo um JSON com name="Cartão de Crédito MASTERCARD", cardHolderName="MARIA SILVA", cardNumber="12345", expirationDate="09/10/2026", cvv="", default="no"
        Then o status da resposta deve ser "403"
        And o sistema contém somente 1 método de pagamento: "Cartão de Crédito VISA", com cardNumber="12345", expirationDate="09/10/2026", cvv="111", cardHolderName="MARIA SILVA"