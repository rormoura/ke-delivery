Feature: Cadastro e manutenção de clientes

    Criar o CRUD da parte de clientes e criar uma tela de cadastro para cadastrar os clientes

Scenario: Cadastro de cliente faltando alguma informação

Given Eu estou na página de "Cadastro de cliente"
And Eu vejo os campos das credenciais a serem preenchidas
When Eu escrevo o nome "Mário Mota", o e-mail "mmln@cin.com.br" , a senha "sudoku123!", o cpf "06178145598" e salvo
Then Eu permaneço na página de "Cadastro de cliente" 
And Eu vejo uma mensagem de que esta faltando informações a serem preenchidas asdas
And permaneço na pagina de "Cadastro de client



