Adicionar observações sobre o pedido: Uma opção que permite que o cliente envie observações para o restaurante sobre o pedido. Ex.: Remover cebola

Com o objetivo de evitar ingredientes incômodos
Sendo o cliente "João"
Eu quero ser capaz de adiconar observações em um pedido em andamento

Scenario: Adiconar comentário "Sem Cebola" no pedido "15122023"
Given Eu estou na página do pedido "15122023"
And O pedido atual tem o Status "Em Produção" e Valor Total "R$22,90"
And O item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"
When Adiciono a observação "Sem Cebola"
And Confirmo a observação
Then Eu continuo na página do pedido "15122023"
And "Observações do pedido" é alterado para "Sem Cebola"
And Uma notificação de observação é enviada ao restaurante