Feature: cadastro de restaurante

As a um restaurante 
I want que meu restaurante seja cadastrado, atualizado e deletado no site
So I can compartilhar meu cardápio e receber pedidos

Scenario: Cadastro realizado com sucesso
  Given Eu estou na página "registerRestaurant"
  When Eu preencho o campo 
      typeBusiness = "Restaurante", 
      responsibleName = "Marina Melo", 
      responsibleCPF = "12345678910", 
      email = "gerencia@marinarestaurane.com.br", 
      phone = "(88)912345678", 
      password = "xxxxxxxxxyx", 
      phoneRestaurant = "(81)21214545",
      restaurantName = "Restaurante da Marina", 
      CNPJ = "1234567891010", 
      speciality = "Massas" 
      e clico no botão "register"
  Then Eu sou redirecionada para página "loginRestaurant"