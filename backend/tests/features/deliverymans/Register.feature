Feature: Cadastro de entregadores
    Como stakeholder
    Eu quero ter registro dos entregadores
    Para que eu possa agregar mais informações a entregas feitas na plataforma

	@create
	Scenario: Criação de um entregador bem sucedida
		Given o sistema não tem um entregador com "id" igual a "123"
		When uma requisição POST for enviada para "/api/entregadores" com o corpo da requisição sendo um JSON com o campo "id" preenchido com "123", "name" preenchido com "José" e "email" preenchido com "jose@gmail.com"
		Then o status da resposta deve ser "200"
		And o campo "msgCode" do corpo da resposta deve estar preenchido com "success"
		And o JSON da resposta deve conter o campo "id" preenchido com "123", "name" preenchido com "José", "email" preenchido com "jose@gmail.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0"

	@create
	Scenario: Criação de um entregador já existente
		Given o sistema já possui um entregador com "id" igual a "124"
		When uma requisição POST for enviada para "/api/entregadores" com o corpo da requisição sendo um JSON com o campo "id" preenchido com "124", "name" preenchido com "Maria" e "email" preenchido com "maria@gmail.com"
		Then o status da resposta deve ser "403"
		And o campo "msgCode" do corpo da resposta deve estar preenchido com "Deliveryman_already_exists"
		And o JSON da resposta deve ser nulo

	@read
	Scenario: Obtenção de um entregador por ID
  	  Given o sistema já possui um entregador com "id" preenchido com "451", "name" preenchido com "Zacarias", "email" preenchido com "zaca@yahoo.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0"
  	  When uma requisição GET for enviada para "/api/entregadores/451"
	  Then o status da resposta deve ser "200"
	  And o campo "msgCode" do corpo da resposta deve estar preenchido com "success"
      And o JSON da resposta deve conter um entregador com o campo "id" preenchido com "451", "name" preenchido com "Zacarias", "email" preenchido com "zaca@yahoo.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0"

	@read
	Scenario: Obtenção de todos os entregadores
    	Given o sistema já possui o entregador com "id" preenchido com "452", "name" preenchido com "Izabel", "email" preenchido com "iza@yahoo.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0" e o entregador com "id" preenchido com "124", "name" preenchido com "Maria", "email" preenchido com "maria@gmail.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0"
   		When uma requisição GET for enviada para "/api/entregadores"
    	Then o status da resposta deve ser "200"
		And o campo "msgCode" do corpo da resposta deve estar preenchido com "success"
    	And o JSON da resposta deve conter o entregador com o campo "id" preenchido com "452", "name" preenchido com "Izabel", "email" preenchido com "iza@yahoo.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0" e o entregador com o campo "id" preenchido com "124", "name" preenchido com "Maria", "email" preenchido com "maria@gmail.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0"
	
	@update
	Scenario: Atualização de um entregador bem sucedida
		Given o sistema já possui o entregador com "id" preenchido com "12", "name" preenchido com "Manuel", "email" preenchido com "emanu@gmail.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0"
		When uma requisição PUT for enviada para "/api/entregadores/12" com o corpo da requisição sendo um JSON com o campo "id" preenchido com "12", "name" preenchido com "Emanuel" e "email" preenchido com "emanuel@gmail.com"
		Then o status da resposta deve ser "200"
		And o campo "msgCode" do corpo da resposta deve estar preenchido com "success"
		And o JSON da resposta deve conter o campo "id" preenchido com "12", "name" preenchido com "Emanuel", "email" preenchido com "emanuel@gmail.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0"

	@update
	Scenario: Atualização de um entregador não existente
		Given o sistema não possui um entregador com "id" igual a "10"
		When uma requisição PUT for enviada para "/api/entregadores/10" 
		Then o status da resposta deve ser "404"
		And o campo "msgCode" do corpo da resposta deve estar preenchido com "Deliveryman_not_found"
		And o JSON da resposta deve ser nulo
	
	@delete
	Scenario: Remoção de um entregador armazenado por ID
    	Given o sistema já possui o entregador com "id" preenchido com "676", "name" preenchido com "Antônio", "email" preenchido com "toni@yahoo.com", "numOrders" preenchido com "0" e "numRates" preenchido com "0"
    	When uma requisição DELETE for enviada para "/api/entregadores/676"
    	Then o status da resposta deve ser "200"
		And o campo "msgCode" do corpo da resposta deve estar preenchido com "success"
		#And o entregador "Antônio" não deve estar mais armazenado no sistema

	@delete
  	Scenario: Remoção de um entregador não armazenado por ID 
    	Given o sistema não possui um entregador com "id" igual a "122"
    	When uma requisição DELETE for enviada para "/api/entregadores/122"
    	Then o status da resposta deve ser "200"
		And o campo "msgCode" do corpo da resposta deve estar preenchido com "success"



