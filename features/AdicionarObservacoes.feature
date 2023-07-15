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

Scenario: Adiconar comentário "Adicione 3 molhos da casa" em um pedido já concluído
Given Eu estou na página do pedido "10052023"
And O pedido atual tem o Status "Finalizado" e Valor Total "R$22,90"
And O item "Pizza de Marguerita G" tem quantidade definida para "1 Unidades" com valor  unitário de "R$33,00" e total "R$33,00"
And "Observações do pedido" tem valor ""
When Adiciono a observação "Sem Cebola"
And Confirmo a observação
Then Eu continuo na página do pedido "10052023"
And Uma mensagem de erro é exibida informando que não é possível adicionar observações
And "Observações do pedido" exibe ""
