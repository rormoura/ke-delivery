Feature: Histórico de pedidos
    Sendo o usuário "Marcus" do tipo "Cliente"
    Eu quero visualizar meus pedidos feitos
    Para que eu possa acompanhar minhas compras no aplicativo


    Scenario: Visualizar os pedidos feitos nos últimos 10 dias (GUI)
        Given Eu estou na página "Meus Pedidos"
        And É exibido o pedido "09072023" com data "09/07/2023" com Status "Em produção" e valor total "R$104,10"
        And É exibido o pedido "05052023" com data "05/05/2023" com Status "Cancelado" e valor total "R$83,92"
        And É exibido o pedido "03032023" com data "03/03/2023" com Status "Fnalizado" e valor total "R$57,33"
        And Hoje é dia "10/07/2023"
        When Eu solicito a exibição dos pedidos feitos nos "últimos 10 dias"
        Then Eu continuo na página "Meus Pedidos"
        And É exibido o pedido "09072023" com data "09/07/2023" com Status "Cancelado" e valor total "R$104,10"

    Scenario: Visualizar um pedido em uma data inválida (GUI) 
        Given Eu estou na página "Meus Pedidos"
        And É exibido o pedido "08062023" com data "08/06/2023" com Status "Em produção" e valor total "R$104,10"
        And É exibido o pedido "12092022" com data "12/09/2022" com Status "Finalizado" e valor total "43,22"
        And Hoje é dia "10/07/2023"
        When Eu solicito a exibição dos pedidos feitos na data "15/03/2024"
        Then Eu continuo na página "Meus Pedidos"
        And É exibido uma mensagem de erro informando que a data é inválida
        And É exibido uma mensagem de erro informando que a data é inválida
        And O seletor de datas está definido como "Todos os pedidos"
        And É exibido o pedido "08062023" com data "08/06/2023" com Status "Em produção" e valor total "R$104,10"
        And É exibido o pedido "12092022" com data "12/09/2022" com Status "Fnalizado" e valor total "43,22"

    Scenario: Acompanhar o pedido "15122023" (GUI)
        Given Eu estou na página "Meus Pedidos"
        And É exibido o pedido "15122023" com data "15/12/2023" com Status "Em produção" e valor total "R$43,14"
        And É exibido o pedido "05032023" com data "05/03/2023" com Status "Finalizado" e valor total "44,22"
        When Seleciono o pedido "15122023"
        Then É exibida a página do pedido "15122023"
        And É exibido o item "Macarronada" com quantidade definida para "1 Unidades" com valor  unitário de "R$43,14" e total "R$43,14"
        And É exbido o Status "Em produção"
        And É exbido a observação "Com molho extra"

    Scenario: Obter todos os pedidos feitos (SERVICE)
        Given PedidosService retorna uma lista de itens
        When uma requisição "GET" for enviada para "/pedidos"
        Then o status da resposta deve ser "200"
        And o JSON da resposta deve ser uma lista de itens
        And o pedido "09072023" com data "09/07/2023" com Status "Em produção" e valor total "R$104,10" está na lista
        And o pedido "05052023" com data "05/05/2023" com Status "Cancelado" e valor total "R$83,92" está na lista
        And o pedido "03032023" com data "03/03/2023" com Status "Finalizado" e valor total "R$57,33" está na lista

    Scenario: Obter pedido existente (SERVICE)
        Given PedidosService retorna uma lista de pedidos
        When uma requisição "GET" for enviada para "/api/pedidos/15122023"
        Then o status da resposta deve ser "200" e o JSON da resposta deve ser id = "15122023", CPF_Cliente = "111.442.412.54", CPF_Entregador = "567.223.123.55", CNPJ_Restaurante = "66.324.165/0005-00", Data = "15/12/2023", Endereco = "Rua das Labutas, 876, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = "Macarronada", quantidade = "1", VUnit = "R$43,14", VTot = "R$43,14"}", MetodoDePagamento = "Cartão de Crédito VISA", Observacoes = "Com molho extra", Status = "Finalizado" e ValorTotal = "R$43,14"

    @runThis
    Scenario: Obter pedido com código inválido (SERVICE)
        Given Pedidos contém um único pedido com JSON contendo id = "6000", CPF_Cliente = "222.555.312.11", CPF_Entregador = "644.132.162.23", CNPJ_Restaurante = "22.543.654/0001-00", Data = "15/09/2022", Endereco = "Rua das Quedas, 333, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = "Pizza de Marguerita G", quantidade = "1", VUnit = "R$33,00", VTot = "R$33,00"}", MetodoDePagamento = "Cartão de Crédito VISA", Observacoes = "Nenhuma", Status = "Em preparo" e ValorTotal = "R$40,00"
        When uma requisição "GET" for enviada para "/api/pedidos/999999"
        Then o status da resposta deve ser "404" e o JSON da resposta deve ser "Pedido não encontrado"