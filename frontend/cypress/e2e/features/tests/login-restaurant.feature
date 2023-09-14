Feature: Login de resaturante

As um restaurante 
I want fazer login no sistema 
So I can eu posso acessar o sistema e meus pedidos

Scenario: Login pelo sistema realizado com sucesso
  Given Eu estou na página "loginRestaurant"
  When Eu preencho o campo “email” com “teste@gmail.com”, o campo “password” com “marinamelo13” e clico no botão "login"
  Then Eu devo logar na página "homeRestaurant?=email${email}"

# Campo vazio
Scenario: Login pelo sistema falha
  Given Eu estou na página "loginRestaurant"
  When Eu preencho o campo “email” com “contato.com.br” e clico no botão "login"
  Then Eu permaneço na página "loginRestaurant"

Scenario: Não tem conta e precisa ir para cadastro
  Given Eu estou na página "loginRestaurant"
  When Eu clico no link "goToRegister"
  Then Eu devo entrar na página "registerRestaurant"