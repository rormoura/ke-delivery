Feature: Criação de Pedidos
	Com o objetivo de adquirir itens desejados
	Sendo o usuário "João" do tipo "Cliente"
	Eu quero ser capaz de efetivar um pedido

	Scenario 1: Finalizar compra (GUI)
		Given Eu estou na página "Carrinho de compras"
		And É exibido o item "Macarronada" com quantidade definida para "2 Unidades" com valor  unitário de "25,00" e total "50,00"
		And o método de pagamento selecionado é o "Cartão de Crédito VISA"
		And o endereço selecionado é "Casa na Torre"
		And cupons aplicatos tem valor ""
		When Eu confirmo o pedido
		Then É gerado um pedido com id "0001"
		And É exibida a página do pedido "0001"
		And É exibido o item "Macarronada" com quantidade definida para "2 Unidades" com valor  unitário de "25,00" e total "50,00"
		And o status do pedido "0001" é "Aguardando confirmação do Restaurante"
		And Uma notificação de novo pedido é enviada ao restaurante

	Scenario 2: Finalizar compra (Service)
		Given Pedidos contém os pedidos "0001" e "0002"
		When uma requisição "POST" for enviada para "/pedidos" com o corpo da requisição sendo um JSON com o id "0003"
		And o JSON deve ter item = {nome = "Tofu", quantidade = "2", VUnit = "R$10,00", VTot = "R$20,00"}
		And o JSON tem ValorTotal = "R$20,00"
		And o JSON tem Data = "25/09/2020"
		And o JSON tem Observacoes = ""
		Then o status da resposta deve ser "200"
		And o JSON da resposta deve conter o id "0003" 
		And o JSON deve ter item = {nome = "Tofu", quantidade = "2", VUnit = "R$10,00", VTot = "R$20,00"}
		And o JSON tem ValorTotal = "R$20,00"
		And o JSON tem Data = "25/09/2020"
		And o JSON tem Observacoes = ""