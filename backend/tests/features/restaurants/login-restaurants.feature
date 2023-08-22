Feature: Login de resaturante

As um restaurante 
I want fazer login no sistema 
So I can eu posso acessar o sistema e meus pedidos

@testLogin
Scenario: Login pelo sistema realizado com sucesso
  Given o restaurante já tem cadastro no sistema com email = "contato@marinarestaurante.com.br" 
  When Eu preencho o campo “Email” com “contato@marinarestaurante.com.br”
  And Eu preencho o campo “Senha” com “xxxxxxxxxxx”
  Then o status da resposta deve ser "200"
  And Eu devo entrar na conta do meu restaurante

# Email inválido
Scenario: Login pelo sistema falha
  Given o restaurante já tem cadastro no sistema
  When Eu preencho o campo “Email” com “contato.com.br”
  And Eu preencho o campo “Senha” com “xxxxxxxxxxx”
  Then o status da resposta deve ser "400" 

# Campo vazio
Scenario: Login pelo sistema falha
  Given o restaurante já tem cadastro no sistema
  When Eu preencho o campo “Email” com “contato@marinarestaurante.com.br”
  And Eu preencho o campo “Senha” com " "
  Then o status da resposta deve ser "400" 

Scenario: Login social com API do google
  Given o restaurante já tem cadastro no sistema
  When Eu aperto em “Fazer login com Google”
  And Eu seleciono o email desejado no pop-up do Google
  Then o status da resposta deve ser "200"
  And Eu devo entrar na conta do meu restaurante