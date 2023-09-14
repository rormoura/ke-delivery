Feature: Cadastro e manutenção de promoções (inserir, remover, atualizar)
    As a restaurante
    I want to inserir, remover e atualizar as promoções do restaurante
    so that gerencio as promoções que disponibilizo aos clientes

    Scenario: Adição de promoção realizada com sucesso
        Given o restaurante "Churras do Lucas" está na página de "promotions"
        And o restaurante "Churras do Lucas" de id "16" possui somente a promoção "40TAO", a qual aplica "40%" de desconto
        When o restaurante "Churras do Lucas" de id "16" adiciona a promoção "10BARRA10", a qual aplica "10%" de desconto
        Then o restaurante "Churras do Lucas" permanece na página de "promotions"
        And vê uma mensagem que indica que a adição foi realizada com sucesso
        And vê a promoção "40TAO", a qual aplica "40%" de desconto
        And a promoção "10BARRA10", a qual aplica "10%" de desconto
        
    Scenario: Tentativa de adição de promoção já existente
        Given o restaurante "Churras do Lucas" está na página de "promotions"
        And o restaurante "Churras do Lucas" de id "16" possui somente as promoções: 1 - "40TAO", a qual aplica "40%" de desconto, 2 - "10BARRA10", a qual aplica "10%" de desconto
        When o restaurante "Churras do Lucas" de id "16" cria a promoção "40TAO", a qual aplica "44%" de desconto
        Then o restaurante "Churras do Lucas" permanece na página de "promotions"
        And vê uma mensagem que indica a impossibilidade de adicionar a promoção "40TAO" novamente
        And vê somente as promoções: 1 - "40TAO", a qual aplica "40%" de desconto, 2 - "10BARRA10", a qual aplica "10%" de desconto
        
    Scenario: Remoção de promoção realizada com sucesso
        Given o restaurante "Churras do Lucas" está na página de "promotions"
        And o restaurante "Churras do Lucas" de id "16" possui somente as 2 promoções: 1 - "40TAO", a qual aplica "40%" de desconto, 2 - "10BARRA10", a qual aplica "10%" de desconto
        When o restaurante "Churras do Lucas" remove a promoção "40TAO"
        Then o restaurante "Churras do Lucas" permanece na página de "promotions"
        And vê uma mensagem que indica que a remoção foi realizada com sucesso
        And vê somente a promoção "10BARRA10", a qual aplica "10%" de desconto

    Scenario: Atualização de promoção realizada com sucesso
        Given o restaurante "Churras do Lucas" está na página de "promotions"
        And o restaurante "Churras do Lucas" de id "16" possui somente a promoção: "10BARRA10", a qual aplica "10%" de desconto
        When o restaurante "Churras do Lucas" de id "16" define que a promoção "10BARRA10" agora aplica "12%" de desconto
        Then o restaurante "Churras do Lucas" permanece na página de "promotions"
        And vê uma mensagem que indica que a atualização foi realizada com sucesso
        And vê somente a promoção: "10BARRA10", a qual aplica "12%" de desconto