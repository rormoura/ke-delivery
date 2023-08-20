Feature: cadastro de restaurante

As a um restaurante 
I want que meu restaurante seja cadastrado, atualizado e deletado no site
So I can compartilhar meu cardápio e receber pedidos

Scenario: Cadastro realizado com sucesso
  Given eu estou na página (“Cadastre-se”)
  When eu preencho o campo “Tipo de negócio” com “Restaurante”
  And eu preencho o campo “Nome” com “Marina Melo”
  And eu preencho o campo “Email” com “contato@marinarestaurante.com.br”
  And eu preencho o campo “Contato “ com “(12)345678910”
  And eu preencho o campo “Senha” com “xxxxxxxxxyx”
  When uma requisição POST for enviada para "/api/parceiros" com o corpo da requisição sendo um JSON de cadastro 
  {
  "nome": "Marina Melo",
  "email": "contato@marinarestaurante.com.br",
  "contato": "(12) 3456-78910",
  "tipoNegocio": "Restaurante",
  "senha": "xxxxxxxxxyx"
  }
  Then o status da resposta deve ser "200"

Scenario: Cadastro não finalizado com email inválido 
  Given eu estou na página “Home”
  When eu sigo para a página “Seja nosso parceiro” 
  Then  eu devo entrar na página de “Cadastre-se”
  When eu preencho o campo “Tipo de negócio” com “Restaurante”
  And eu preencho o campo “Nome” com “Marina Melo”
  And eu preencho o campo “Email” com “contato.com.br”
  And eu preencho o campo “Contato “ com “(12)345678910”
  And eu preencho o campo “Senha” com “xxxxxxxxxyx”
  When uma requisição POST for enviada para "/api/parceiros" com o corpo da requisição sendo um JSON de cadastro
  {
  "nome": "Marina Melo",
  "email": "contato.com.br",
  "contato": "(12) 3456-78910",
  "tipoNegocio": "Restaurante",
  "senha": "xxxxxxxxxyx"
  }
  Then o status da resposta deve ser "400"

Scenario: Cadastro de endereço restaurante 
  Given o sistema já contém os dados iniciais com email: "contato@marinarestaurante.com.br"
  When eu preencho o campo CEP com "58035-080"
  Then os campos Estado, Cidade, Bairro, Endereço devem ser completado com "Paraíba", "João Pessoa", "Bessa" e "Rua Napoleão Gomes Varela"
  And eu preencho o campo Numero com "123"
  When uma requisição POST for enviada para "/api/parceiros" com um JSON de requisição
  {
    "CEP": "58035-080",
    "Estado": "Paraíba",
    "Cidade": "João Pessoa",
    "Bairro": "Bessa",
    "Endereço": "Rua Napoleão Gomes Varela",
    "Numero": "123"
  }
  Then o status de resposta deve ser "200"
  
Scenario: Atualização de informação do restaurante 

Scenario: Remoção de restaurante do site
  