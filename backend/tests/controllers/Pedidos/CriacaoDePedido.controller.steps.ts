/* eslint-disable no-unused-expressions */
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../src/app';
import { di } from '../../../src/di';
import PedidoRepository from '../../../src/repositories/Pedidos/pedido.repository';
import PedidoEntity from '../../../src/entities/Pedidos/pedido.entity';


const feature = loadFeature('tests/features/pedidos/CriacaoDePedidos.feature', {tagFilter: "@runThis" });
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
  test('Finalizar compra (Service)', ({ given, when, then, and }) => {
    given(/^Pedidos contém um pedido com JSON contendo id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
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
    when(/^uma requisição "POST" for enviada para "pedidos" com o corpo da requisição contendo id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
        async (id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
          response = await request.post('/api/pedidos').send({
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
          });
  });
    then(/^o status da resposta deve ser "(.*)" e o JSON da resposta deve conter o id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
    async (resp, id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
      expect(response.status).toBe(parseInt(resp, 10))
      expect(response.body.data).toEqual(
        expect.objectContaining({
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
        })
      );
    })              
  });
});