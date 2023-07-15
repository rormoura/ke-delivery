Acompanhar o estado de um pedido: Tela com informações sobre um pedido em específico, informando qual o status, qual o valor, os itens, etc.

Com o objetivo de evitar gastos desnecessários
Sendo a cliente "Maria"
Eu quero ser capaz de cancelar um pedido que não desejo mais

Scenario: Cancelar o pedido "090720231430"
Given Eu estou na página do pedido "090720231430"
And O pedido atual tem o Status "Em Produção" e Valor Total "R$104,10"
And O item "Poke" tem quantidade definida para "2 Unidades" com valor  unitário de "R$30,10" e total "R$60,20"
And O item "Sashimi" tem quantidade definida para "1 Unidade" com valor unitário de "R$43,90" e total "R$43,90"
When Eu cancelo o pedido
Then Eu continuo na página do pedido "090720231430"
And o status do pedido "090720231430" é alterado para "Cancelado"
And Uma notificação de cancelamento é enviada ao restaurante