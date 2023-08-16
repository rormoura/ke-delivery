Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

#O cenário abaixo é testado em CashPaymentMethod.controller.steps.ts
@runThisScenarioCash
    Scenario: Remoção de método de pagamento realizada com sucesso (serviço) 
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente 1 método de pagamento de "Maria": "Dinheiro"
        When a usuária "Maria" remove o método de pagamento "Dinheiro"
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema não contém métodos de pagamento de "Maria"
#O cenário abaixo é testado em PaymentMethods.controller.steps.ts
@runThisScenarioPaymentMethods
    Scenario: Modificação do método de pagamento padrão realizada com sucesso (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente 2 métodos de pagamento de "Maria": "Cartão de Crédito ELO", "Google Pay", este último é o método de pagamento padrão
        When a usuária "Maria" escolhe "Cartão de Crédito ELO" como o novo método de pagamento padrão
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente 2 métodos de pagamento de "Maria": "Google Pay", "Cartão de Crédito ELO", este último é o método de pagamento padrão
#O cenário abaixo é testado em PixPaymentMethod.controller.steps.ts
@runThisScenarioPix
    Scenario: Adição do método de pagamento realizada com sucesso (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente 1 método de pagamento de "Maria": "Pix"
        When a usuária "Maria" adiciona o método de pagamento "Google Pay"
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente 2 métodos de pagamento de "Maria": "Pix", "Google Pay"
#O cenário abaixo é testado em GooglePayPaymentMethod.controller.steps.ts
@runThisScenarioGooglePay
    Scenario: Tentativa de adição de método de pagamento com informações incompletas (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente 1 método de pagamento de "Maria": "Google Pay"
        When a usuária "Maria" adiciona o método de pagamento "Cartão de Crédito ELO" de maneira incompleta
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente 1 método de pagamento de "Maria": "Google Pay"
#O cenário abaixo é testado em CreditCardPaymentMethod.controller.steps.ts
@runThisScenarioCreditCard
    Scenario: Tentativa de atualização de método de pagamento (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente 1 método de pagamento de "Maria": "Cartão de Crédito VISA", com "número do cartão"="12345", "validade"="09/10/2026", "CVV"="111", "nome do titular"="MARIA SILVA"
        When a usuária "Maria" atualiza o método de pagamento "Cartão de Crédito VISA" de maneira incompleta
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente 1 método de pagamento de "Maria": "Cartão de Crédito VISA", com "número do cartão"="12345", "validade"="09/10/2026", "CVV"="111", "nome do titular"="MARIA SILVA"