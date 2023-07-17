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
        And "jonas@outlook.com" está cadastrado como o único email do usuário "Jonas"
        When o usuário "Jonas" solicita o reenvio do comprovante do pedido "2" 
        Then o sistema envia para "jonas@outlook.com" o comprovante do pedido "2"