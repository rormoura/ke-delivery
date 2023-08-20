Feature: Cadastro e manutenção de promoções (inserir, remover, atualizar)
    As a restaurante
    I want to inserir, remover e atualizar as promoções do restaurante
    so that gerencio as promoções que disponibilizo aos clientes

    Scenario: Adição de promoção realizada com sucesso
        Given o restaurante "Churras do Lucas" está na página de "Promoções"
        And o restaurante "Churras do Lucas" possui somente a promoção "40TAO", a qual aplica "40%" de desconto
        When o restaurante "Churras do Lucas" adiciona a promoção "10BARRA10", a qual aplica "10%" de desconto
        Then o restaurante "Churras do Lucas" permanece na página de "Promoções"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê a promoção "40TAO", a qual aplica "40%" de desconto
        And a promoção "10BARRA10", a qual aplica "10%" de desconto
        
    Scenario: Adição de promoção já existente
        Given o restaurante "Churras do Lucas" está na página de "Promoções"
        And o restaurante "Churras do Lucas" possui somente a promoção "QFOMEBB", a qual aplica "25%" de desconto
        When o restaurante "Churras do Lucas" adiciona a promoção "QFOMEBB", a qual aplica "20%" de desconto
        Then o restaurante "Churras do Lucas" permanece na página de "Promoções"
        And vê uma mensagem que indica a impossibilidade de adicionar a promoção "QFOMEBB" novamente
        And vê somente a promoção "QFOMEBB", a qual aplica "25%" de desconto
    
    Scenario: Remoção de promoção realizada com sucesso (GUI)
        Given o restaurante "Churras do Lucas" está na página de "Promoções"
        And o restaurante "Churras do Lucas" possui somente a promoção "40TAO", a qual aplica "40%" de desconto
        When o restaurante "Churras do Lucas" remove a promoção "40TAO"
        Then o restaurante "Churras do Lucas" permanece na página de "Promoções"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê que não possui nenhuma promoção

    Scenario: (serviço) Remoção de promoção realizada com sucesso
        Given o restaurante "Churras do Lucas" está cadastrado no sistema
        And o restaurante "Churras do Lucas" possui somente a promoção "40TAO", a qual aplica "40%" de desconto
        When o restaurante "Churras do Lucas" remove a promoção "40TAO"
        Then o sistema remove a promoção "40TAO" do sistema
        And não armazena mais promoções do restaurante "Churras do Lucas"

    Scenario: Atualização de promoção realizada com sucesso
        Given o restaurante "Churras do Lucas" está na página de "Promoções"
        And o restaurante "Churras do Lucas" possui somente a promoção "QFOMEBB", a qual aplica "25%" de desconto
        When o restaurante "Churras do Lucas" define que a promoção "QFOMEBB" agora aplica "30%" de desconto
        Then o restaurante "Churras do Lucas" permanece na página de "Promoções"
        And vê uma mensagem que indica que a operação foi realizada com sucesso
        And vê somente a promoção "QFOMEBB", a qual aplica "30%" de desconto