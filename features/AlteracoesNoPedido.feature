Feature: Alterações no Pedido
	Com o objetivo de ter uma experiência melhor de compra
	Sendo a usuária "Maria" do tipo "Cliente"
	Eu quero ser capaz de modificar um pedido

	Scenario 1: Cancelar o pedido "090720231430" (GUI)
		Given Eu estou na página do pedido "090720231430"
		And O pedido atual tem o Status "Em Produção" e Valor Total "R$104,10"
		And O item "Poke" tem quantidade definida para "2 Unidades" com valor  unitário de "R$30,10" e total "R$60,20"
		And O item "Sashimi" tem quantidade definida para "1 Unidade" com valor unitário de "R$43,90" e total "R$43,90"
		When Eu cancelo o pedido
		Then Eu continuo na página do pedido "090720231430"
		And o status do pedido "090720231430" é alterado para "Cancelado"
		And Uma notificação de cancelamento é enviada ao restaurante

	Scenario 2: Remover item "Salsa" do Carrinho de compras (GUI)
		Given eu estou na página "Carrinho de Compras"
		And É exibido item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"
		And É exibido o item "Azeite" que tem qauntidade definida para "1 Unidades" com valor  unitário de "R$2,00" e total "R$2,00"
		When Removo o item "Salsa"
		And Confirmo a remoção
		Then Eu continuo na página "Carrinho de Compras"
		And É exibido item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"

	Scenario 3: Adiconar comentário "Sem Cebola" no pedido "15122023" (GUI)
		Given Eu estou na página do pedido "15122023"
		And O pedido atual tem o Status "Em Produção" e Valor Total "R$22,90"
		And O item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"
		When Adiciono a observação "Sem Cebola"
		And Confirmo a observação
		Then Eu continuo na página do pedido "15122023"
		And Observações do pedido é alterado para "Sem Cebola"
		And Uma notificação de observação é enviada ao restaurante

	Scenario 4 : Adiconar comentário "Adicione 3 molhos da casa" em um pedido já concluído (GUI)
		Given Eu estou na página do pedido "10052023"
		And O pedido atual tem o Status "FinalizadoCapriche no tomate" e Valor Total "R$22,90"
		And O item "Pizza de Marguerita G" tem quantidade definida para "1 Unidades" com valor  unitário de "R$33,00" e total "R$33,00"
		And "Observações do pedido" tem valor ""
		When Adiciono a observação "Sem Cebola"
		And Confirmo a observação
		Then Eu continuo na página do pedido "10052023"
		And Uma mensagem de erro é exibida informando que não é possível adicionar observações
		And "Observações do pedido" exibe ""

	Scenario 5: Adiconar comentário "Remova os picles" no pedido "0001" (SERVICE)
        Given PedidosService contém um pedido com id "0001"
        When uma requisição "PUT/0001/:obs:" for enviada para "/pedidos/0001/:obs" com o corpo da requisição sendo um JSON com a observação "Remova os picles"
        Then o status da resposta deve ser "200"
        And o JSON da resposta deve ser "Remova os picles"
		
	Scenario 6: Adiconar comentário "Capriche no tomate" no pedido "9999" (SERVICE)
        Given PedidosService contém um pedido com id "0001"
        When uma requisição "PUT/9999/:obs:" for enviada para "/pedidos/9999/:obs" com o corpo da requisição sendo um JSON com a observação "Capriche no tomate"
        Then o status da resposta deve ser "404"
        And o JSON da resposta deve ser "Pedido não encontrado"
