Feature: Painel de clientes

    Scenario: Deletar cliente
        Given que eu estou na pagina "painel-customer"
        When Eu vejo o cliente que tem o campo "cpfPainel" com cpf "06178145598" e clico no botão "botonPainel"
        Then vejo a indicação que o cliente foi deletado "popupPainel"

