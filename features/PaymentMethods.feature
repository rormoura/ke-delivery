Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

    Scenario: Remoção de método de pagamento realizada com sucesso (GUI)
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui os métodos de pagamento "Cartão de Crédito ELO", "Google Pay", "Cartão de Crédito VISA"
        When a usuária "Maria" remove o método de pagamento "Cartão de Crédito VISA"
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê somente os métodos de pagamento "Cartão de Crédito ELO", "Google Pay"

    Scenario: Remoção de método de pagamento realizada com sucesso (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente "3" métodos de pagamento de "Maria": "Cartão de Crédito ELO", "Google Pay", "Cartão de Crédito VISA"
        When a usuária "Maria" remove o método de pagamento "Cartão de Crédito VISA"
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente "2" métodos de pagamento de "Maria": "Cartão de Crédito ELO", "Google Pay"

    Scenario: Modificação do método de pagamento padrão realizada com sucesso (GUI)
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui os métodos de pagamento "Cartão de Crédito ELO"
        And "Google Pay", o qual é o método de pagamento padrão
        When a usuária "Maria" escolhe "Cartão de Crédito ELO" como o novo método de pagamento padrão
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê os métodos de pagamento "Google Pay", "Cartão de Crédito ELO", este último é o método de pagamento padrão

    Scenario: Modificação do método de pagamento padrão realizada com sucesso (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente "2" métodos de pagamento de "Maria": "Cartão de Crédito ELO", "Google Pay", este último é o método de pagamento padrão
        When a usuária "Maria" escolhe "Cartão de Crédito ELO" como o novo método de pagamento padrão
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente "2" métodos de pagamento de "Maria": "Google Pay"
        And "Cartão de Crédito ELO", o qual é o método de pagamento padrão

    Scenario: Adição do método de pagamento realizada com sucesso (GUI)
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui somente o método de pagamento "Pix"
        When a usuária "Maria" adiciona o método de pagamento "Google Pay"
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê os métodos de pagamento "Pix", "Google Pay"

    Scenario: Adição do método de pagamento realizada com sucesso (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente "1" método de pagamento de "Maria": "Pix"
        When a usuária "Maria" adiciona o método de pagamento "Google Pay"
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente "2" métodos de pagamento de "Maria": "Pix", "Google Pay"

    Scenario: Tentativa de adição de método de pagamento com informações incompletas (GUI)
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui somente o método de pagamento "Cartão de Crédito ELO"
        When a usuária "Maria" adiciona o método de pagamento "Cartão de Crédito VISA" com "número do cartão"="12345", "validade"="09/10/2026", "CVV"="-", "nome do titular"="MARIA SILVA"
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica a impossibilidade de adicionar o método de pagamento "Cartão de Crédito VISA" pois o "CVV" está incompleto
        And vê somente o método de pagamento "Cartão de Crédito ELO"

    Scenario: Tentativa de adição de método de pagamento com informações incompletas (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente "1" método de pagamento de "Maria": "Cartão de Crédito ELO"
        When a usuária "Maria" adiciona o método de pagamento "Cartão de Crédito VISA" de maneira incompleta
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente "1" método de pagamento de "Maria": "Cartão de Crédito ELO"

    Scenario: Tentativa de atualização de método de pagamento (GUI)
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui somente o método de pagamento "Cartão de Crédito VISA"
        When a usuária "Maria" atualiza "nome do titular" do método de pagamento "Cartão de Crédito VISA" para "-"
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica a impossibilidade de altualizar o método
        de pagamento "Cartão de Crédito VISA", pois "nome do titular" inserido é inválido

    Scenario: Tentativa de atualização de método de pagamento (serviço)
        Given a usuária "Maria" está armazenada no sistema
        And o sistema contém somente "1" método de pagamento de "Maria": "Cartão de Crédito VISA", com "número do cartão"="12345", "validade"="09/10/2026", "CVV"="111", "nome do titular"="MARIA SILVA"
        When a usuária "Maria" atualiza o método de pagamento "Cartão de Crédito VISA" de maneira incompleta
        Then a usuária "Maria" permanece armazenada no sistema
        And o sistema contém somente "1" método de pagamento de "Maria": "Cartão de Crédito VISA", com "número do cartão"="12345", "validade"="09/10/2026", "CVV"="111", "nome do titular"="MARIA SILVA"