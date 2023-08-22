Feature: Notificação de pedidos

As um restaurante
I want receber notificação de pedidos
So I can eu posso preparar o pedido e enviar ao cliente

Scenario: Notificação - aceitar pedido
  Given Eu estou logada na conta do meu restaurante
  And Recebo notificação de um pedido
  And Eu abro a página de pedidos
  When Eu aceito o pedido no botão (“Confirmar”)
  Then Eu tenho um novo pedido em andamento

Scenario: Notificação - rejeitar pedido
  Given Eu estou logada na conta do meu restaurante
  And Recebo notificação de um pedido
  And Eu abro a página de pedidos
  When Eu rejeito o pedido no botão (“Rejeitar”)
  Then Eu o pedido é excluido da minha lista de pedidos

