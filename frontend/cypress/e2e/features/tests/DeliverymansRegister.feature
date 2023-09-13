Feature: Cadastro de entregadores
    Como stakeholder
    Eu quero ter registro dos entregadores
    Para que eu possa agregar mais informações a entregas feitas na plataforma

    Scenario: Visualizar entregadores
        Given o usuário está na página "entregadores" com a entregadora "Maria" armazenada no sitema
        Then o usuário deve ver a entregadora "Maria"