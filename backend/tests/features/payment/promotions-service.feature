Feature: Cadastro e manutenção de promoções (inserir, remover, atualizar)
    As a restaurante
    I want to inserir, remover e atualizar as promoções do restaurante
    so that gerencio as promoções que disponibilizo aos clientes

    Scenario: Update promotion name
        Given o método updatePromotion chamado com "DIADOSPAIS" e "{id: "1", name: "20%OFF", discount: "20%"}" do PromotionService retorna uma promoção de id "1", nome "20%OFF" e desconto "20%"
        When o método updatePromotion é chamado para atualizar o nome da promoção "DIADOSPAIS", de id "1" e desconto "20%", para "20%OFF"
        Then a promoção retornada deve ter id "1", nome "20%OFF" e desconto "20%"

    Scenario: Create promotion
        Given o método createPromotion chamado com "{id: "2", name: "QFOMEBB", discount: "25%"}" do PromotionService retorna uma promoção de id "2", nome "QFOMEBB" e desconto "25%"
        When o método createPromotion é chamado para criar a promoção "QFOMEBB", de id "2" e desconto "25%"
        Then a promoção retornada deve ter id "2", nome "QFOMEBB" e desconto "25%"

    Scenario: Return all promotions
        Given o método getPromotions do PromotionService retorna um array com as promoções "{id: "3", name: "40TAO", discount: "40%"}" e "{id: "4", name: "10BARRA10", discount: "10%"}"
        When o método getPromotions é chamado
        Then o array retornado deve conter as promoções "{id: "3", name: "40TAO", discount: "40%"}" e "{id: "4", name: "10BARRA10", discount: "10%"}"
    
    Scenario: Delete promotion
        Given o método deletePromotion chamado com "BLACKFRIDAY" do PromotionService não realiza retorno
        When o método deletePromotion é chamado para remover a promoção "BLACKFRIDAY"
        Then nada deve ser retornado