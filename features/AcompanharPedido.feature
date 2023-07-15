Acompanhar o estado de um pedido: Tela com informações sobre um pedido em específico, informando qual o status, qual o valor, os itens, etc.

Com o objetivo de acompanhar o meu pedido
Sendo o cliente "Henrique"
Eu quero ser capaz de acompanhar o status do meu pedido

Scenario: Acompanhar o pedido "15122023"
Given Eu estou na página "Meus Pedidos"
And É exibido o pedido "15122023" com data "15/12/2023" com Status "Em produção" e valor total "R$43,14"
And É exibido o pedido "05032023" com data "05/03/2023" com Status "Finalizado" e valor total "44,22"
When Seleciono o pedido "15122023"
Then É exibida a página do pedido "15122023"
And É exibido o item "Macarronada" com quantidade definida para "1 Unidades" com valor  unitário de "R$43,14" e total "R$43,14"
And É exbido o Status "Em produção"
And É exbido a observação "Com molho extra"