Com o objetivo de personalizar meu pedido
Sendo o cliente "Cléber"
Eu quero ser capaz de editar os itens em um pedido em andamento

Scenario: Remover item "Salsa" do Carrinho de compras
Given eu estou na página "Carrinho de Compras"
And É exibido item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"
And É exibido o item "Azeite" que tem quantidade definida para "1 Unidades" com valor  unitário de "R$2,00" e total "R$2,00"
When Removo o item "Salsa"
And Confirmo a remoção
Then Eu continuo na página "Carrinho de Compras"
And É exibido item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"

Scenario: Editar quantidade do item "Cerveja" para valor negativo
Given eu estou na página "Carrinho de Compras"
And É exibido item "Cerveja" tem quantidade definida para "5 Unidades" com valor  unitário de "R$6,00" e total "R$30,00"
When tento alterar a quantidade do item para "-5"
Then Eu continuo na página "Carrinho de Compras"
And É exibido uma mensagem de erro informando que não é possível definir quantidades negativas
And É exibido item "Cerveja" tem quantidade definida para "5 Unidades" com valor  unitário de "R$6,00" e total "R$30,00"
