Feature: Cadastro e manutenção de promoções (inserir, remover, atualizar)
    As a restaurante
    I want to inserir, remover e atualizar as promoções do restaurante
    so that gerencio as promoções que disponibilizo aos clientes

    Scenario: Adição de promoção realizada com sucesso (serviço)
        Given o sistema contém somente 1 promoção: "40TAO", a qual aplica "40%" de desconto
        When uma requisição POST for enviada para "/api/promotions" com o corpo da requisição sendo um JSON com name="10BARRA10", discount="10%"
        Then o status da resposta deve ser "200"
        And o sistema agora contém 2 promoções: "40TAO", a qual aplica "40%" de desconto, "10BARRA10", a qual aplica "10%" de desconto

    Scenario: Adição de promoção já existente (serviço)
        Given o sistema contém somente 1 promoção: "QFOMEBB", a qual aplica "25%" de desconto
        When uma requisição POST for enviada para "/api/promotions" com o corpo da requisição sendo um JSON com name="QFOMEBB", discount="20%"
        Then o status da resposta deve ser "403"
        And o sistema contém somente 1 promoção: "QFOMEBB", a qual aplica "25%" de desconto

    Scenario: Remoção de promoção realizada com sucesso (serviço)
        Given o sistema contém somente 1 promoção: "40TAO", a qual aplica "40%" de desconto
        When uma requisição DELETE for enviada para "/api/promotions/40TAO"
        Then o status da resposta deve ser "200"
        And o sistema não contém nenhuma promoção 

    Scenario: Atualização de promoção realizada com sucesso (serviço)
        Given o sistema contém somente 1 promoção: "QFOMEBB", a qual aplica "25%" de desconto
        When uma requisição UPDATE for enviada para "/api/promotions/QFOMEBB" com o corpo da requisição sendo um JSON com name="QFOMEBB", discount="30%"
        Then o status da resposta deve ser "200"
        And o sistema contém somente 1 promoção: "QFOMEBB", a qual aplica "30%" de desconto