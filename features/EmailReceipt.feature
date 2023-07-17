Feature: Disparo de emails para usuários com comprovante de pedido
    As a cliente
    I want to receber comprovantes de pedido no meu email
    so that eu posso manter um histórico das minhas compras

    Scenario: Comprovante de pedido enviado com sucesso
        Given o usuário "Jonas" possui o pedido "1" não finalizado
        And "jonas@outlook.com" está cadastrado como o único email do usuário "Jonas"
        When o usuário "Jonas" finaliza o pedido "1"
        Then o sistema envia para "jonas@outlook.com" o comprovante do pedido "1"

    Scenario: Reenvio de comprovante de pedido, por email, realizado com sucesso
        Given o usuário "Jonas" possui o pedido "2" finalizado
        And "jonas@outlook.com.br" está cadastrado como o único email do usuário "Jonas"
        When o usuário "Jonas" solicita o reenvio do comprovante do pedido "2" 
        Then o sistema envia para "jonas@outlook.com.br" o comprovante do pedido "2"
    
    Scenario: Cliente responde email que contém comprovante de pedido
        Given o usuário "Jonas" está cadastrado no sistema com o email "jonas@outlook.com.br"
        And possui o pedido "2" finalizado
        And o sistema enviou o comprovante do pedido "2" para "jonas@outlook.com.br"
        When o usuário "Jonas" responde o email que contém o comprovante do pedido "2"
        Then o sistema envia ao email "jonas@outlook.com.br" uma mensagem que explica que o
        email que contém o comprovante do pedido "2" não deve ser respondido