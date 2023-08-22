Feature: cadastro de restaurante

As a um restaurante 
I want que meu restaurante seja cadastrato no site
So I can compartilhar meu cardápio e receber pedidos

Scenario 1: Cadastro

Given Eu estou na página “Home”
When Eu acesso “Seja nosso parceiro” 
Then  Eu devo entrar na página de “Cadastre-se”
When Eu preencho o campo “Tipo de negócio” com “Restaurante”
And Eu preencho o campo “Nome” com “Marina Melo”
And Eu preencho o campo “Email” com “contato@marinarestaurante.com.br”
And Eu preencho o campo “Contato “ com “(12)345678910”
And Eu preencho o campo “Senha” com “xxxxxxxxxyx”
And Aperto em “Cadastrar”
Then Devo ter cadastrado as informações iniciais do restaurante