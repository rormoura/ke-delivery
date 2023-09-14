Feature: Disparo de emails para usuários com comprovante de pedido
    As a cliente
    I want to receber comprovantes de pedido no meu email
    so that eu posso manter um histórico das minhas compras

    Scenario: Comprovante de pedido enviado com sucesso (serviço)
        Given o usuário "Jonas" está armazenado no sistema
        And o sistema somente contém "1" pedido do usuário "Jonas" que está em andamento: o pedido "1"
        And o sistema contém o email de "Jonas": "jonas@outlook.com"
        When o usuário "Jonas" finaliza o pedido "1"
        Then o usuário "Jonas" permanece armazenado no sistema
        And o sistema não contém nenhum pedido de "Jonas" que está em andamento
        And o sistema envia para "jonas@outlook.com" o comprovante do pedido "1"

    Scenario: Reenvio de comprovante de pedido, por email, realizado com sucesso (serviço)
        Given o usuário "Jonas" está armazenado no sistema
        And o sistema somente contém "3" pedidos do usuário "Jonas" que estão finalizados: os pedidos "1", "2", "3"
        And o sistema contém o email de "Jonas": "jonas@outlook.com"
        When o usuário "Jonas" solicita o reenvio do comprovante do pedido "2"
        Then o usuário "Jonas" permanece armazenado no sistema
        And o sistema somente contém "3" pedidos do usuário "Jonas" que estão finalizados: os pedidos "1", "2", "3"
        And o sistema envia para "jonas@outlook.com.br" o comprovante do pedido "2"
    
    Scenario: Cliente responde email que contém comprovante de pedido (serviço)
        Given o usuário "Jonas" está armazenado no sistema
        And o sistema contém o email de "Jonas": "jonas@outlook.com"
        And o sistema somente contém "3" pedidos do usuário "Jonas" que estão finalizados: os pedidos "1", "2", "3"
        When o usuário "Jonas" responde o email que contém o comprovante do pedido "2"
        Then o usuário "Jonas" permanece armazenado no sistema
        And o sistema somente contém "3" pedidos do usuário "Jonas" que estão finalizados: os pedidos "1", "2", "3"
        And o sistema envia ao email "jonas@outlook.com.br" uma mensagem que explica que o
        email que contém o comprovante do pedido "2" não deve ser respondido