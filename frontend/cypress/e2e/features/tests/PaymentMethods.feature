Feature: Cadastro e manutenção de métodos de pagamento /inserir, remover, atualizar
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

Scenario: Remoção de método de pagamento realizada com sucesso
    Given a usuária "Maria" está na página de "paymentMethods"
    And possui os métodos de pagamento "Cartão de Crédito ELO", "Google Pay", "Cartão de Crédito VISA"
    When a usuária "Maria" remove o método de pagamento "Cartão de Crédito VISA"
    Then a usuária "Maria" permanece na página de "paymentMethods"
    Then vê uma mensagem que indica que a operação foi realizada com sucesso
    Then vê somente os métodos de pagamento "Cartão de Crédito ELO", "Google Pay"

Scenario: Modificação do método de pagamento padrão realizada com sucesso
    Given a usuária "Maria" está na página de "paymentMethods"
    And possui os métodos de pagamento "Cartão de Crédito ELO"
    And "Google Pay", o qual é o método de pagamento padrão
    When a usuária "Maria" escolhe "Cartão de Crédito ELO" como o novo método de pagamento padrão
    Then a usuária "Maria" permanece na página de "paymentMethods"
    And vê uma mensagem que indica que o método de pagamento padrão foi definido com sucesso
    And vê somente os métodos de pagamento "Google Pay", "Cartão de Crédito ELO", este último é o método de pagamento padrão

Scenario: Adição do método de pagamento realizada com sucesso
    Given a usuária "Maria" está na página de "paymentMethods"
    And possui os métodos de pagamento "Cartão de Crédito ELO", "Google Pay"
    When a usuária "Maria" adiciona o método de pagamento "Pix banco do brasil"
    Then a usuária "Maria" permanece na página de "paymentMethods"
    And vê uma mensagem que indica que o método foi adicionado com sucesso
    And vê somente os métodos de pagamento "Pix banco do brasil", "Cartão de Crédito ELO", "Google Pay"

Scenario: Tentativa de adição de método de pagamento com informações incompletas
    Given a usuária "Maria" está na página de "paymentMethods"
    And possui somente os métodos de pagamento "Pix banco do brasil", "Cartão de Crédito ELO", "Google Pay"
    When a usuária "Maria" adiciona o método de pagamento "Cartão de Crédito VISA" com "número do cartão"="12345", "validade"="2026-10-09", "CVV"="", "nome do titular"="MARIA SILVA"
    Then a usuária "Maria" permanece na página de "paymentMethods"
    And vê uma mensagem que indica a impossibilidade de adicionar o método de pagamento "Cartão de Crédito VISA" pois está incompleto
    And vê somente os 3 métodos de pagamento "Pix banco do brasil", "Cartão de Crédito ELO", "Google Pay"

Scenario: Tentativa de atualização de método de pagamento
    Given a usuária "Maria" está na página de "paymentMethods"
    And possui somente os 3 métodos de pagamento "Pix banco do brasil", "Cartão de Crédito ELO", "Google Pay"
    When a usuária "Maria" atualiza "nome do titular" do método de pagamento "Cartão de Crédito ELO" para ""
    Then a usuária "Maria" permanece na página de "paymentMethods"
    And vê uma mensagem que indica a impossibilidade de altualizar o método de pagamento "Cartão de Crédito ELO", pois está incompleto
    And continua vendo somente os métodos de pagamento "Pix banco do brasil", "Cartão de Crédito ELO", "Google Pay" inalterados