Feature: Criação de Pedidos
	Com o objetivo de adquirir itens desejados
	Sendo o usuário "João" do tipo "Cliente"
	Eu quero ser capaz de efetivar um pedido

	Scenario: Finalizar compra (GUI)
		Given Eu estou na página "Carrinho de compras"
		And É exibido o item "Macarronada" com quantidade definida para "2 Unidades" com valor  unitário de "25,00" e total "50,00"
		And o método de pagamento selecionado é o "Cartão de Crédito VISA"
		And o endereço selecionado é "Casa na Torre"
		And cupons aplicatos tem valor "Nenhuma"
		When Eu confirmo o pedido
		Then É gerado um pedido com id "0001"
		And É exibida a página do pedido "0001"
		And É exibido o item "Macarronada" com quantidade definida para "2 Unidades" com valor  unitário de "25,00" e total "50,00"
		And o status do pedido "0001" é "Aguardando confirmação do Restaurante"
		And Uma notificação de novo pedido é enviada ao restaurante

	Scenario: Finalizar compra (Service)
		Given Pedidos contém um pedido com JSON contendo id = "0001", CPF_Cliente = "654.243.312.11", CPF_Entregador = "645.323.162.43", CNPJ_Restaurante = "22.949.533/0001-00", Data = "15/05/2022", Endereco = "Rua das Flores, 432, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = 'Salsicha', quantidade = '3', VUnit = 'R$10,00',VTot = 'R$30,00'}", MetodoDePagamento = "Dinheiro", Observacoes = "Nenhuma", Status = "Finalizado" e ValorTotal = "R$30,00"
		When uma requisição "POST" for enviada para "pedidos" com o corpo da requisição contendo id = "0002", CPF_Cliente = "111.111.111.11", CPF_Entregador = "000.000.000.00", CNPJ_Restaurante = "12.345.678/0003-00", Data = "25/09/2020", Endereco = "Rua Mauricéia, 358, Torre, Recife, Pernambuco, Brasil", Itens = "{nome = 'Tofu', quantidade = '2', VUnit = 'R$10,00', VTot = 'R$20,00'}", MetodoDePagamento = "Cartão de Crédito VISA", Observacoes = "Nenhuma", Status = "Aguardando confirmação do restaurante" e ValorTotal = "R$20,00"
		Then o status da resposta deve ser "200" e o JSON da resposta deve conter o id = "0002", CPF_Cliente = "111.111.111.11", CPF_Entregador = "000.000.000.00", CNPJ_Restaurante = "12.345.678/0003-00", Data = "25/09/2020", Endereco = "Rua Mauricéia, 358, Torre, Recife, Pernambuco, Brasil", Itens = "{nome = 'Tofu', quantidade = '2', VUnit = 'R$10,00', VTot = 'R$20,00'}", MetodoDePagamento = "Cartão de Crédito VISA", Observacoes = "Nenhuma", Status = "Aguardando confirmação do restaurante" e ValorTotal = "R$20,00"
    