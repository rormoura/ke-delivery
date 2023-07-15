Exibir o histórico de compras dos últimos 10 dias: Exibir uma lista com os pedidos e as respectivas informações de um período de tempo igual a 10 dias

Scenario 1: Visualizar os pedidos feitos nos últimos 10 dias
Given Eu estou na página "Meus Pedidos"
And É exibido o pedido "09072023" com data "09/07/2023" com Status "Em produção" e valor total "R$104,10"
And É exibido o pedido "05052023" com data "05/05/2023" com Status "Cancelado" e valor total "R$83,92"
And É exibido o pedido "03032023" com data "03/03/2023" com Status "Fnalizado" e valor total "R$57,33"
And Hoje é dia "10/07/2023"
When Eu solicito a exibição dos pedidos feitos nos "últimos 10 dias"
Then Eu continuo na página "Meus Pedidos"
And É exibido o pedido "09072023" com data "09/07/2023" com Status "Cancelado" e valor total "R$104,10"

Scenario 2: Visualizar um pedido em uma data inválida
Given Eu estou na página "Meus Pedidos"
And É exibido o pedido "08062023" com data "08/06/2023" com Status "Em produção" e valor total "R$104,10"
And É exibido o pedido "12092022" com data "12/09/2022" com Status "Finalizado" e valor total "43,22"
And Hoje é dia "10/07/2023"
When Eu solicito a exibição dos pedidos feitos na data "15/03/2024"
Then Eu continuo na página "Meus Pedidos"
And É exibido uma mensagem de erro informando que a data é inválida
And É exibido uma mensagem de erro informando que a data é inválida
And O seletor de datas está definido como "Todos os pedidos"
And É exibido o pedido "08062023" com data "08/06/2023" com Status "Em produção" e valor total "R$104,10"
And É exibido o pedido "12092022" com data "12/09/2022" com Status "Fnalizado" e valor total "43,22"