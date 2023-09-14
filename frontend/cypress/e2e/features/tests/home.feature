Feature: Página inicial Ké Delivery

As um restaurante 
I want fazer login no sistema 
So I can eu posso acessar o sistema e meu perfil

Scenario: Clicar no botão entrar
  Given Eu estou na página "navbar"
  When Eu clico no botão "typesLogin"
  Then Eu sou redirecionada para página "typesLogin"  