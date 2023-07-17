Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

    Scenario: Remoção de método de pagamento realizada com sucesso
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui os métodos de pagamento "Cartão de Crédito ELO", "Google Pay", "Cartão de Crédito VISA"
        When a usuária "Maria" remove o método de pagamento "Cartão de Crédito VISA"
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê somente os métodos de pagamento "Cartão de Crédito ELO"
        And "Google Pay"

    Scenario: Modificação do método de pagamento padrão realizada com sucesso
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui os métodos de pagamento "Cartão de Crédito ELO"
        And "Google Pay", o qual é o método de pagamento padrão
        When a usuária "Maria" escolhe "Cartão de Crédito ELO" como o novo método de pagamento padrão
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê os métodos de pagamento "Google Pay"
        And "Cartão de Crédito ELO", o qual é o método de pagamento padrão

    Scenario: Adição do método de pagamento realizada com sucesso
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui somente o método de pagamento "Apple Pay"
        When a usuária "Maria" adiciona o método de pagamento "Google Pay"
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê os métodos de pagamento "Apple Pay"
        And "Google Pay"

    Scenario: Tentativa de adição de método de pagamento com informações incompletas
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui somente o método de pagamento "Cartão de Crédito ELO"
        When a usuária "Maria" adiciona o método de pagamento "Cartão de Crédito VISA" com "número do cartão" "12345", "validade" "09/10/2026", "CVV" "-", "nome do titular" "MARIA SILVA"
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica a impossibilidade de adicionar o método de pagamento "Cartão de Crédito VISA" pois o "CVV" está incompleto
        And vê somente o método de pagamento "Cartão de Crédito ELO"

    Scenario: Tentativa de atualização de método de pagamento (GUI)
        Given a usuária "Maria" está na página de "Métodos de Pagamento"
        And possui somente o método de pagamento "Cartão de Crédito VISA"
        When a usuária "Maria" atualiza "nome do titular" do método de pagamento
        "Cartão de Crédito VISA" para "-"
        Then a usuária "Maria" permanece na página de "Métodos de Pagamento"
        And vê uma mensagem que indica a impossibilidade de altualizar o método
        de pagamento "Cartão de Crédito VISA", pois "nome do titular" inserido é inválido

    Scenario: Tentativa de atualização de método de pagamento (serviço)
        Given a usuária "Maria" está cadastrada no sistema
        And possui somente o método de pagamento "Cartão de Crédito VISA"
        When a usuária "Maria" atualiza o método de pagamento
        "Cartão de Crédito VISA" de maneira inválida
        Then o sistema não realiza a atualização do método de
        pagamento "Cartão de Crédito VISA", o qual continua armazenado no sistema
        And a test stepdevmain