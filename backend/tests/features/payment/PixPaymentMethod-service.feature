Feature: Cadastro e manutenção de métodos de pagamento (inserir, remover, atualizar)
	As a cliente
    I want to inserir, remover e atualizar meus métodos de pagamento
    so that administro como pago meus pedidos

    Scenario: Update pix payment method name
        Given o método updatePixPaymentMethod chamado com "Pix BB" e "{id: "1", name: "Pix inter", default: "no"}" do PixPaymentMethodService retorna um método de pagamento pix de id "1", nome "Pix inter" e default "no"
        When o método updatePixPaymentMethod é chamado para atualizar o nome do método de pagamento "Pix BB", de id "1" e default "no", para "Pix inter"
        Then o método de pagamento pix retornado deve ter id "1", nome "Pix inter" e default "no"

    Scenario: Create pix payment method
        Given o método createPixPaymentMethod chamado com "{id: "2", name: "Pix Santander", default: "no"}" do PixPaymentMethodService retorna um método de pagamento em dinheiro de id "2", nome "Pix Santander" e default "no"
        When o método createPixPaymentMethod é chamado para criar o método de pagamento "Pix Santander", de id "2" e default "no"
        Then o método de pagamento pix retornado deve ter id "2", nome "Pix Santander" e default "no"

    Scenario: Return all pix payment methods
        Given o método getPixPaymentMethods do PixPaymentMethodService retorna um array com os métodos de pagamento "{id: "3", name: "Pix Bradesco", default: "no"}" e "{id: "4", name: "Pix Nubank", default: "no"}"
        When o método getPixPaymentMethods é chamado
        Then o array retornado deve conter os métodos de pagamento "{id: "3", name: "Pix Bradesco", default: "no"}" e "{id: "4", name: "Pix Nubank", default: "no"}"
    
    Scenario: Delete pix payment method
        Given o método deletePixPaymentMethod chamado com "Pix inter" do PixPaymentMethodService não realiza retorno
        When o método deletePixPaymentMethod é chamado para remover o método de pagamento "Pix inter"
        Then nada deve ser retornado