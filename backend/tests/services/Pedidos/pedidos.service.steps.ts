import { loadFeature, defineFeature } from 'jest-cucumber';
import PedidoRepository from '../../../src/repositories/Pedidos/pedido.repository';
import PedidoEntity from '../../../src/entities/Pedidos/pedido.entity';
import PedidoService from '../../../src/services/Pedidos/pedido.service';
import PedidoModel from '../../../src/models/Pedidos/pedido.model';
const feature = loadFeature('tests/features/pedidos/Pedidos-service.feature');
defineFeature(feature, (test) => {
  // mocking the repository
  let mockPedidoRepository: PedidoRepository;
  let service: PedidoService;
  let idToCall: string;
  let entityToCall: PedidoEntity;
  let pedidoReturned: PedidoEntity;
  let pedidosReturnedArray: PedidoEntity[];
  let voidReturned: void;
  let mockPedidoEntity: PedidoEntity;
  let mockPedidoEntityArray: PedidoEntity[];

  beforeEach(() => {
    mockPedidoRepository = {
      getPedidos: jest.fn(),
      getPedido: jest.fn(),
      createPedido: jest.fn(),
      updatePedido: jest.fn(),
      deletePedido: jest.fn(),
    } as any;
    service = new PedidoService(mockPedidoRepository);
  });

  test('Update observacao', ({ given, when, then }) => {
    given(
      /^o método updatePedido chamado com id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)" do PedidoService retorna um pedido de id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async (id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal, id1, IdCliente1, IdEntregador1, IdRestaurante1, Data1, Endereco1, Itens1, MetodoDePagamento1, Observacoes1, Status1, ValorTotal1) => {
        idToCall = id;
        entityToCall = new PedidoEntity({
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
        mockPedidoEntity = new PedidoEntity({
          "id": id1,
          "IdCliente": IdCliente1,
          "IdEntregador": IdEntregador1,
          "IdRestaurante": IdRestaurante1,
          "Data": Data1,
          "Endereco": Endereco1,
          "Itens": Itens1,
          "MetodoDePagamento": MetodoDePagamento1,
          "Observacoes": Observacoes1,
          "Status": Status1,
          "ValorTotal": ValorTotal1
        })
        jest.spyOn(mockPedidoRepository, 'updatePedido')
          .mockResolvedValue(mockPedidoEntity);
      });

    when(/^o método updatePedido é chamado para atualizar a Observação = "(.*)" do pedido de id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async (obs, id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        pedidoReturned = await service.updatePedido(id, new PedidoEntity({
          "id": id,
          "IdCliente": IdCliente,
          "IdEntregador": IdEntregador,
          "IdRestaurante": IdRestaurante,
          "Data": Data,
          "Endereco": Endereco,
          "Itens": Itens,
          "MetodoDePagamento": MetodoDePagamento,
          "Observacoes": obs,
          "Status": Status,
          "ValorTotal": ValorTotal
        }));
      });
       then(/^o pedido retornado deve ter id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      (id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        const pedidoModel = new PedidoModel(new PedidoEntity({
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
        }))
        expect(pedidoReturned).toEqual(pedidoModel);
        expect(mockPedidoRepository.updatePedido).toBeCalledWith(idToCall, entityToCall)
      });
  });
  //-------------------------------------------------------------------------------------------------------------------------------------
  test('Create pedido', ({ given, when, then }) => {
    given(
      /^o método createPedido chamado com id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)" do PedidoService retorna um pedido de id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async (id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal, id1, IdCliente1, IdEntregador1, IdRestaurante1, Data1, Endereco1, Itens1, MetodoDePagamento1, Observacoes1, Status1, ValorTotal1) => {
        entityToCall = new PedidoEntity({
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
        mockPedidoEntity = new PedidoEntity({
          "id": id1,
          "IdCliente": IdCliente1,
          "IdEntregador": IdEntregador1,
          "IdRestaurante": IdRestaurante1,
          "Data": Data1,
          "Endereco": Endereco1,
          "Itens": Itens1,
          "MetodoDePagamento": MetodoDePagamento1,
          "Observacoes": Observacoes1,
          "Status": Status1,
          "ValorTotal": ValorTotal1
        })
        jest.spyOn(mockPedidoRepository, 'createPedido')
          .mockResolvedValue(mockPedidoEntity);
      });

    when(/^o método createPedido é chamado para criar o pedido com id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async(id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        pedidoReturned = await service.createPedido(new PedidoEntity({
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
    then(/^o pedido retornado deve ter id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      (id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        const pedidoModel = new PedidoModel(new PedidoEntity({
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
        }))
        expect(pedidoReturned).toEqual(pedidoModel);
        expect(mockPedidoRepository.createPedido).toBeCalledWith(entityToCall)
      });
  });
  //-------------------------------------------------------------------------------------------------------------------------------------
  test('Return all pedidos', ({ given, when, then }) => {
    given(
      /^o método getPedidos do PedidoService retorna um array com os pedidos id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)" e id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async (id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal, id1, IdCliente1, IdEntregador1, IdRestaurante1, Data1, Endereco1, Itens1, MetodoDePagamento1, Observacoes1, Status1, ValorTotal1) => {
        mockPedidoEntityArray = [
          new PedidoEntity({
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
          }),
          new PedidoEntity({
            "id": id1,
            "IdCliente": IdCliente1,
            "IdEntregador": IdEntregador1,
            "IdRestaurante": IdRestaurante1,
            "Data": Data1,
            "Endereco": Endereco1,
            "Itens": Itens1,
            "MetodoDePagamento": MetodoDePagamento1,
            "Observacoes": Observacoes1,
            "Status": Status1,
            "ValorTotal": ValorTotal1
          })]
        jest.spyOn(mockPedidoRepository, 'getPedidos')
          .mockResolvedValue(mockPedidoEntityArray);
      });

    when(/^o método getPedidos é chamado$/,
      async () => {
        pedidosReturnedArray = await service.getPedidos();
      });

    then(/^o array retornado deve conter os pedidos id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)" e id = "(.*)", IdCliente = "(.*)", IdEntregador = "(.*)", IdRestaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
      (id, IdCliente, IdEntregador, IdRestaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal, id1, IdCliente1, IdEntregador1, IdRestaurante1, Data1, Endereco1, Itens1, MetodoDePagamento1, Observacoes1, Status1, ValorTotal1) => {
        const pedidoModelArray = [new PedidoModel(new PedidoEntity({
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
        })),
        new PedidoModel(new PedidoEntity({
          "id": id1,
          "IdCliente": IdCliente1,
          "IdEntregador": IdEntregador1,
          "IdRestaurante": IdRestaurante1,
          "Data": Data1,
          "Endereco": Endereco1,
          "Itens": Itens1,
          "MetodoDePagamento": MetodoDePagamento1,
          "Observacoes": Observacoes1,
          "Status": Status1,
          "ValorTotal": ValorTotal1
        }))]
        expect(pedidosReturnedArray).toEqual(pedidoModelArray);
        expect(mockPedidoRepository.getPedidos).toBeCalledWith()
      });
  });
  //-------------------------------------------------------------------------------------------------------------------------------------
  test('Delete pedido', ({ given, when, then }) => {
    given(
      /^o método deletePedido chamado com "(.*)" do PedidoService não realiza retorno$/,
      async (idPedido) => {
        idToCall = idPedido;
        jest.spyOn(mockPedidoRepository, 'deletePedido')
          .mockImplementation();
      });

    when(/^o método deletePedido é chamado para remover o pedido "(.*)"$/,
      async (idPedido) => {
        voidReturned = await service.deletePedido(idPedido);
      });

    then(/^nada deve ser retornado$/,
      () => {
        expect(voidReturned).toBeUndefined();
        expect(mockPedidoRepository.deletePedido).toBeCalledWith(idToCall)
      });
  });
});