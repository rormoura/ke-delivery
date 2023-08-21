Feature: Alterações no Pedido
	Com o objetivo de ter uma experiência melhor de compra
	Sendo a usuária "Maria" do tipo "Cliente"
	Eu quero ser capaz de modificar um pedido

	Scenario: Cancelar o pedido "090720231430" (GUI)
		Given Eu estou na página do pedido "090720231430"
		And O pedido atual tem o Status "Em Produção" e Valor Total "R$104,10"
		And O item "Poke" tem quantidade definida para "2 Unidades" com valor  unitário de "R$30,10" e total "R$60,20"
		And O item "Sashimi" tem quantidade definida para "1 Unidade" com valor unitário de "R$43,90" e total "R$43,90"
		When Eu cancelo o pedido
		Then Eu continuo na página do pedido "090720231430"
		And o status do pedido "090720231430" é alterado para "Cancelado"
		And Uma notificação de cancelamento é enviada ao restaurante

	Scenario: Remover item "Salsa" do Carrinho de compras (GUI)
		Given eu estou na página "Carrinho de Compras"
		And É exibido item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"
		And É exibido o item "Azeite" que tem qauntidade definida para "1 Unidades" com valor  unitário de "R$2,00" e total "R$2,00"
		When Removo o item "Salsa"
		And Confirmo a remoção
		Then Eu continuo na página "Carrinho de Compras"
		And É exibido item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"

	Scenario: Adiconar comentário "Sem Cebola" no pedido "15122023" (GUI)
		Given Eu estou na página do pedido "15122023"
		And O pedido atual tem o Status "Em Produção" e Valor Total "R$22,90"
		And O item "Pão de Alho" tem quantidade definida para "5 Unidades" com valor  unitário de "R$5,00" e total "R$25,00"
		When Adiciono a observação "Sem Cebola"
		And Confirmo a observação
		Then Eu continuo na página do pedido "15122023"
		And Observações do pedido é alterado para "Sem Cebola"
		And Uma notificação de observação é enviada ao restaurante

	Scenario: Adiconar comentário "Adicione 3 molhos da casa" em um pedido já concluído (GUI)
		Given Eu estou na página do pedido "10052023"
		And O pedido atual tem o Status "FinalizadoCapriche no tomate" e Valor Total "R$22,90"
		And O item "Pizza de Marguerita G" tem quantidade definida para "1 Unidades" com valor  unitário de "R$33,00" e total "R$33,00"
		And "Observações do pedido" tem valor ""
		When Adiciono a observação "Sem Cebola"
		And Confirmo a observação
		Then Eu continuo na página do pedido "10052023"
		And Uma mensagem de erro é exibida informando que não é possível adicionar observações
		And "Observações do pedido" exibe ""

  @runThis
	Scenario: Adiconar comentário em um pedido existente (SERVICE)
    Given Pedidos contém um pedido com JSON contendo id = "6000", CPF_Cliente = "222.555.312.11", CPF_Entregador = "644.132.162.23", CNPJ_Restaurante = "22.543.654/0001-00", Data = "15/09/2022", Endereco = "Rua das Quedas, 333, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = "Pizza de Marguerita G", quantidade = "1", VUnit = "R$33,00", VTot = "R$33,00"}", MetodoDePagamento = "Cartão de Crédito VISA", Observacoes = "Nenhuma", Status = "Em preparo" e ValorTotal = "R$40,00"
    When uma requisição PUT for enviada para "/api/pedidos/6000" com o corpo da requisição JSON contendo id = "6000", CPF_Cliente = "222.555.312.11", CPF_Entregador = "644.132.162.23", CNPJ_Restaurante = "22.543.654/0001-00", Data = "15/09/2022", Endereco = "Rua das Quedas, 333, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = "Pizza de Marguerita G", quantidade = "1", VUnit = "R$33,00", VTot = "R$33,00"}", MetodoDePagamento = "Cartão de Crédito VISA", Observacoes = "Remova os picles", Status = "Em preparo" e ValorTotal = "R$40,00"
    Then o status da resposta deve ser "200" e o JSON da resposta deverá conter Observacoes = "Remova os picles"
		
  @runThis
	Scenario:Cancelar pedido (SERVICE)
    Given Pedidos contém um pedido com JSON contendo id = "6000", CPF_Cliente = "222.555.312.11", CPF_Entregador = "644.132.162.23", CNPJ_Restaurante = "22.543.654/0001-00", Data = "15/09/2022", Endereco = "Rua das Quedas, 333, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = 'Café', quantidade = '4', VUnit = 'R$10,00',VTot = 'R$40,00'}", MetodoDePagamento = "Dinheiro", Observacoes = "Nenhuma", Status = "Em preparo" e ValorTotal = "R$40,00"
    When uma requisição de alteração for enviada para "/api/pedidos/6000" com o corpo JSON contendo id = "6000", CPF_Cliente = "222.555.312.11", CPF_Entregador = "644.132.162.23", CNPJ_Restaurante = "22.543.654/0001-00", Data = "15/09/2022", Endereco = "Rua das Quedas, 333, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = 'Café', quantidade = '4', VUnit = 'R$10,00',VTot = 'R$40,00'}", MetodoDePagamento = "Dinheiro", Observacoes = "Nenhuma", Status = "Cancelado" e ValorTotal = "R$40,00"
    Then o status da resposta deve ser "200" e o JSON da resposta deve conter Status = "Cancelado"

  @runThis
	Scenario: Adiconar comentário em um pedido inexistente(SERVICE)
    Given PedidosService contém um pedido com id = "5435", CPF_Cliente = "111.222.312.11", CPF_Entregador = "333.444.162.23", CNPJ_Restaurante = "33.543.654/0001-00", Data = "22/09/2022", Endereco = "Avenida das Quedas, 666, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = 'Queijo', quantidade = '4', VUnit = 'R$10,00',VTot = 'R$40,00'}", MetodoDePagamento = "Dinheiro", Observacoes = "Nenhuma", Status = "Em preparo" e ValorTotal = "R$40,00"
    When uma requisição PUT for enviada para "/api/pedidos/9999/" com o corpo JSON contendo id = "5435", CPF_Cliente = "111.222.312.11", CPF_Entregador = "333.444.162.23", CNPJ_Restaurante = "33.543.654/0001-00", Data = "22/09/2022", Endereco = "Avenida das Quedas, 666, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = 'Queijo', quantidade = '4', VUnit = 'R$10,00',VTot = 'R$40,00'}", MetodoDePagamento = "Dinheiro", Observacoes = "Capriche no tomate", Status = "Em preparo" e ValorTotal = "R$40,00"
    Then o status da resposta deve ser "404" e o JSON da resposta deve ser "Pedido não encontrado"
