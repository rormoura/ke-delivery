/* eslint-disable no-unused-expressions */
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../src/app';
import { di } from '../../../src/di';
import PedidoRepository from '../../../src/repositories/Pedidos/pedido.repository';
import PedidoEntity from '../../../src/entities/Pedidos/pedido.entity';


const feature = loadFeature('tests/features/AlteracoesNoPedido.feature', {tagFilter: "@runThis" });
const request = supertest(app);
defineFeature(feature, (test) => {
  // mocking the repository
  let mockPedidoRepository: PedidoRepository;
  let mockPedidoEntity: PedidoEntity;
  let response: supertest.Response;
  beforeEach(() => {
    mockPedidoRepository = di.getRepository<PedidoRepository>(PedidoRepository);
  });
  afterEach(async () => {
    (await mockPedidoRepository.getPedidos()).forEach(async pedido => { await mockPedidoRepository.deletePedido(pedido.name); })
  })
  test('Cancelar pedido (SERVICE)', ({ given, when, then, and }) => {
    given(/^Pedidos contém um pedido com JSON contendo id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
    async (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        mockPedidoEntity = await mockPedidoRepository.createPedido(new PedidoEntity({
            "id": "1",
            "name": name,
            "CPF_Cliente": CPF_Cliente,
            "CPF_Entregador": CPF_Entregador,
            "CNPJ_Restaurante": CNPJ_Restaurante,
            "Data": Data,
            "Endereco": Endereco,
            "Itens": Itens,
            "MetodoDePagamento": MetodoDePagamento,
            "Observacoes": Observacoes,
            "Status": Status,
            "ValorTotal": ValorTotal
          }));
      });
    when(/^uma requisição de alteração for enviada para "(.*)" com o corpo JSON contendo id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
        async (URL, id, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
          response = await request.put(URL).send({
            "name": id,
            "CPF_Cliente": CPF_Cliente,
            "CPF_Entregador": CPF_Entregador,
            "CNPJ_Restaurante": CNPJ_Restaurante,
            "Data": Data,
            "Endereco": Endereco,
            "Itens": Itens,
            "MetodoDePagamento": MetodoDePagamento,
            "Observacoes": Observacoes,
            "Status": Status,
            "ValorTotal": ValorTotal
          });
  });
    then(/^o status da resposta deve ser "(.*)" e o JSON da resposta deve conter Status = "(.*)"/,
      async (resp, Status) => {
        expect(response.status).toBe(parseInt(resp, 10))
        response = await request.get('/api/pedidos/6000');
        expect(response.body.data).toEqual(
          expect.objectContaining({
            "Status": Status,
          })
        );
      })            
  });
  //@runThis
  //Scenario: Adiconar comentário "Capriche no tomate" em um pedido inexistente(SERVICE)
  //  Given PedidosService contém um pedido com id "5435"
  //  When uma requisição "PUT" for enviada para "/pedidos/9999/" com o corpo da requisição sendo um JSON com a observação "Capriche no tomate"
  //  Then o status da resposta deve ser "404" e o JSON da resposta deve ser "Pedido não encontrado"

  test('Adiconar comentário em um pedido inexistente(SERVICE)', ({ given, when, then, and }) => {
    given(/^PedidosService contém um pedido com id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "Dinheiro", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
      async (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        mockPedidoEntity = await mockPedidoRepository.createPedido(new PedidoEntity({
          "id": "1",
          "name": name,
          "CPF_Cliente": CPF_Cliente,
          "CPF_Entregador": CPF_Entregador,
          "CNPJ_Restaurante": CNPJ_Restaurante,
          "Data": Data,
          "Endereco": Endereco,
          "Itens": Itens,
          "MetodoDePagamento": MetodoDePagamento,
          "Observacoes": Observacoes,
          "Status": Status,
          "ValorTotal": ValorTotal
        }));
      });
    when(/^uma requisição PUT for enviada para "(.*)" com o corpo JSON contendo id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "Dinheiro", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
      async (URL, id, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        response = await request.put(URL).send({
          "name": id,
          "CPF_Cliente": CPF_Cliente,
          "CPF_Entregador": CPF_Entregador,
          "CNPJ_Restaurante": CNPJ_Restaurante,
          "Data": Data,
          "Endereco": Endereco,
          "Itens": Itens,
          "MetodoDePagamento": MetodoDePagamento,
          "Observacoes": Observacoes,
          "Status": Status,
          "ValorTotal": ValorTotal
        });
      });
    then(/^o status da resposta deve ser "(.*)" e o JSON da resposta deve ser "(.*)"/,
      async (resp, enc) => {
        expect(response.status).toBe(parseInt(resp, 10))
        response = await request.get('/api/pedidos/9999');
        if (response.status == 404) {
          response.body.data = "Pedido não encontrado";
        }
        expect(response.body.data).toEqual(
          expect.stringContaining(
            enc,
          )
        );
      })
  });



  //@runThis
  //Scenario: Adiconar comentário em um pedido existente(SERVICE)
  //  Given Pedidos contém um pedido com JSON contendo id = "6000", CPF_Cliente = "222.555.312.11", CPF_Entregador = "644.132.162.23", CNPJ_Restaurante = "22.543.654/0001-00", Data = "15/09/2022", Endereco = "Rua das Quedas, 333, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = "Pizza de Marguerita G", quantidade = "1", VUnit = "R$33,00", VTot = "R$33,00"}, MetodoDePagamento = "Cartão de Crédito VISA",  Observacoes = "Nenhuma", Status = "Em preparo" e ValorTotal = "R$40,00"
  //  When uma requisição PUT for enviada para "api/pedidos/6000" com o corpo da requisição JSON contendo id = "6000", CPF_Cliente = "222.555.312.11", CPF_Entregador = "644.132.162.23", CNPJ_Restaurante = "22.543.654/0001-00", Data = "15/09/2022", Endereco = "Rua das Quedas, 333, Váezea, Recife, Pernambuco, Brasil", Itens = "{nome = "Pizza de Marguerita G", quantidade = "1", VUnit = "R$33,00", VTot = "R$33,00"}, MetodoDePagamento = "Cartão de Crédito VISA", Observacoes = "Remova os picles", Status = "Em preparo" e ValorTotal = "R$40,00"   
  //  Then o status da resposta deve ser "200" e o JSON da resposta deverá conter Observacoes = "Remova os picles"

  test('Adiconar comentário em um pedido existente (SERVICE)', ({ given, when, then, and }) => {
    given(/^Pedidos contém um pedido com JSON contendo id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
      async (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        mockPedidoEntity = await mockPedidoRepository.createPedido(new PedidoEntity({
          "id": "1",
          "name": name,
          "CPF_Cliente": CPF_Cliente,
          "CPF_Entregador": CPF_Entregador,
          "CNPJ_Restaurante": CNPJ_Restaurante,
          "Data": Data,
          "Endereco": Endereco,
          "Itens": Itens,
          "MetodoDePagamento": MetodoDePagamento,
          "Observacoes": Observacoes,
          "Status": Status,
          "ValorTotal": ValorTotal
        }));
      });
    when(/^uma requisição PUT for enviada para "(.*)" com o corpo da requisição JSON contendo id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
      async (URL, id, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        response = await request.put(URL).send({
          "name": id,
          "CPF_Cliente": CPF_Cliente,
          "CPF_Entregador": CPF_Entregador,
          "CNPJ_Restaurante": CNPJ_Restaurante,
          "Data": Data,
          "Endereco": Endereco,
          "Itens": Itens,
          "MetodoDePagamento": MetodoDePagamento,
          "Observacoes": Observacoes,
          "Status": Status,
          "ValorTotal": ValorTotal
        });
      });
    then(/^o status da resposta deve ser "(.*)" e o JSON da resposta deverá conter Observacoes = "(.*)"/,
      async (resp, Obs) => {
        expect(response.status).toBe(parseInt(resp, 10))
        response = await request.get('/api/pedidos/6000');
        expect(response.body.data).toEqual(
          expect.objectContaining({
            "Observacoes": Obs,
          })
        );
      })
  });
});