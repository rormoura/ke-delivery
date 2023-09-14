/* eslint-disable no-unused-expressions */
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../src/app';
import { di } from '../../../src/di';
import PedidoRepository from '../../../src/repositories/Pedidos/pedido.repository';
import PedidoEntity from '../../../src/entities/Pedidos/pedido.entity';


const feature = loadFeature('tests/features/pedidos/HistoricoDePedidos.feature', {tagFilter: "@runThis" });
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
    (await mockPedidoRepository.getPedidos()).forEach(async pedido => { await mockPedidoRepository.deletePedido(pedido.id); })
  })

  //Scenario: Obter pedido com código inválido(SERVICE)
  //      Given getPedidos retorna uma lista com apenas o pedido de id "001"
  //      When uma requisição "GET" for enviada para "/pedidos/999999"
  //      Then o status da resposta deve ser "404"
  //      And o JSON da resposta deve ser "Pedido não encontrado"

  test('Obter pedido com código inválido (SERVICE)', ({ given, when, then, and }) => {
    given(/^Pedidos contém um único pedido com JSON contendo id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
    async (id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        mockPedidoEntity = await mockPedidoRepository.createPedido(new PedidoEntity({
            "id": id,
            "IdCliente": IdCliente,
            "IdEntregador": IdEntregador,
            "IdRestaurante": IdRestaurante,
            "Data": Data,
            "Endereco": Endereco,
            "Itens": Itens,
            "MetodoDePagamento": MetodoDePagamento,
            "Observacoes": Observacoes,
            "Status": Status,
            "ValorTotal": ValorTotal
          }));
      });
    when(/^uma requisição "GET" for enviada para "(.*)"/,
    async (URL) => {
          response = await request.get(URL)
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
});