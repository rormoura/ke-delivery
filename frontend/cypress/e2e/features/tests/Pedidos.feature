# cartButton.feature

Feature: Testes da página de novoItem
  Como um usuário
  Eu quero testar a funcionalidade do componente CartButton

  Scenario: Deslogar
    Given Eu entrei na página de "NovoPedido"
    When Eu aperto no botão "Sair"
    Then Eu alcanço a página de "home"

  Scenario: Verificar visibilidade do carrinho após clique
    Given Eu cheguei na página "NovoPedido"
    Given o carrinho tem visibilidade = "false"
    When Eu aperto o botão "cart-button"
    Then a visibilidade do carrinho vai para "true"

  Scenario: Adicionar um novo pedido no carrinho
    Given Estamos na página "NovoPedido"
    Given a visibilidade do carrinho é = "false"
    When Eu clico em "buttonAddCart" para adicionar um item
    Then a quantidade de itens no carrinho é maior que 0 
    
    
  Scenario: Aumentar as quantidades dos pedidos no carrinho
    Given Fomos para a página "novoPedido"
    Given Eu clico em "buttonAddCart" para adicionar novo item
    When Eu uso o botão "cart-button"
    When Eu aperto em "buttonIncreaseItem" para aumentar a quantidade de itens
    Then a quantidade de itens no carrinho é superior a 3


  Scenario: Diminuir as quantidades dos pedidos no carrinho
    Given Chegamos em "novoPedido"
    Given Eu clico em "buttonAddCart" para colocar um novo item
    Given Eu clico novamente em "buttonAddCart" para colocar um novo item
    When Eu pressiono o botão "cart-button"
    When Eu aperto em "buttonDecreaseItem" para diminuir a quantidade de itens
    Then a quantidade de itens no carrinho é inferior a 3
