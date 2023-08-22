import { loadFeature, defineFeature } from 'jest-cucumber';
import PedidoRepository from '../../../src/repositories/Pedidos/pedido.repository';
import PedidoEntity from '../../../src/entities/Pedidos/pedido.entity';
import PedidoService from '../../../src/services/Pedidos/pedido.service';
import PedidoModel from '../../../src/models/Pedidos/pedido.model';
const feature = loadFeature('tests/features/Pedidos-service.feature');
defineFeature(feature, (test) => {
  // mocking the repository
  let mockPedidoRepository: PedidoRepository;
  let service: PedidoService;
  let nameToCall: string;
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
      /^o método updatePedido chamado com id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)" do PedidoService retorna um pedido de id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal, name1, CPF_Cliente1, CPF_Entregador1, CNPJ_Restaurante1, Data1, Endereco1, Itens1, MetodoDePagamento1, Observacoes1, Status1, ValorTotal1) => {
        nameToCall = name;
        entityToCall = new PedidoEntity({
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
        });
        mockPedidoEntity = new PedidoEntity({
          "id": "1",
          "name": name1,
          "CPF_Cliente": CPF_Cliente1,
          "CPF_Entregador": CPF_Entregador1,
          "CNPJ_Restaurante": CNPJ_Restaurante1,
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

    when(/^o método updatePedido é chamado para atualizar a Observação = "(.*)" do pedido de id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async (obs, name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        pedidoReturned = await service.updatePedido(name, new PedidoEntity({
          "id": "1",
          "name": name,
          "CPF_Cliente": CPF_Cliente,
          "CPF_Entregador": CPF_Entregador,
          "CNPJ_Restaurante": CNPJ_Restaurante,
          "Data": Data,
          "Endereco": Endereco,
          "Itens": Itens,
          "MetodoDePagamento": MetodoDePagamento,
          "Observacoes": obs,
          "Status": Status,
          "ValorTotal": ValorTotal
        }));
      });
       then(/^o pedido retornado deve ter id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        const pedidoModel = new PedidoModel(new PedidoEntity({
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
        }))
        expect(pedidoReturned).toEqual(pedidoModel);
        expect(mockPedidoRepository.updatePedido).toBeCalledWith(nameToCall, entityToCall)
      });
  });
  //-------------------------------------------------------------------------------------------------------------------------------------
  test('Create pedido', ({ given, when, then }) => {
    given(
      /^o método createPedido chamado com id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)" do PedidoService retorna um pedido de id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal, name1, CPF_Cliente1, CPF_Entregador1, CNPJ_Restaurante1, Data1, Endereco1, Itens1, MetodoDePagamento1, Observacoes1, Status1, ValorTotal1) => {
        entityToCall = new PedidoEntity({
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
        });
        mockPedidoEntity = new PedidoEntity({
          "id": "1",
          "name": name1,
          "CPF_Cliente": CPF_Cliente1,
          "CPF_Entregador": CPF_Entregador1,
          "CNPJ_Restaurante": CNPJ_Restaurante1,
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

    when(/^o método createPedido é chamado para criar o pedido com id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async(name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        pedidoReturned = await service.createPedido(new PedidoEntity({
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
    then(/^o pedido retornado deve ter id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal) => {
        const pedidoModel = new PedidoModel(new PedidoEntity({
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
        }))
        expect(pedidoReturned).toEqual(pedidoModel);
        expect(mockPedidoRepository.createPedido).toBeCalledWith(entityToCall)
      });
  });
  //-------------------------------------------------------------------------------------------------------------------------------------
  test('Return all pedidos', ({ given, when, then }) => {
    given(
      /^o método getPedidos do PedidoService retorna um array com os pedidos id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)" e id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"$/,
      async (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal, name1, CPF_Cliente1, CPF_Entregador1, CNPJ_Restaurante1, Data1, Endereco1, Itens1, MetodoDePagamento1, Observacoes1, Status1, ValorTotal1) => {
        mockPedidoEntityArray = [
          new PedidoEntity({
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
          }),
          new PedidoEntity({
            "id": "2",
            "name": name1,
            "CPF_Cliente": CPF_Cliente1,
            "CPF_Entregador": CPF_Entregador1,
            "CNPJ_Restaurante": CNPJ_Restaurante1,
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

    then(/^o array retornado deve conter os pedidos id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)" e id = "(.*)", CPF_Cliente = "(.*)", CPF_Entregador = "(.*)", CNPJ_Restaurante = "(.*)", Data = "(.*)", Endereco = "(.*)", Itens = "(.*)", MetodoDePagamento = "(.*)", Observacoes = "(.*)", Status = "(.*)" e ValorTotal = "(.*)"/,
      (name, CPF_Cliente, CPF_Entregador, CNPJ_Restaurante, Data, Endereco, Itens, MetodoDePagamento, Observacoes, Status, ValorTotal, name1, CPF_Cliente1, CPF_Entregador1, CNPJ_Restaurante1, Data1, Endereco1, Itens1, MetodoDePagamento1, Observacoes1, Status1, ValorTotal1) => {
        const pedidoModelArray = [new PedidoModel(new PedidoEntity({
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
        })),
        new PedidoModel(new PedidoEntity({
          "id": "2",
          "name": name1,
          "CPF_Cliente": CPF_Cliente1,
          "CPF_Entregador": CPF_Entregador1,
          "CNPJ_Restaurante": CNPJ_Restaurante1,
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
        nameToCall = idPedido;
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
        expect(mockPedidoRepository.deletePedido).toBeCalledWith(nameToCall)
      });
  });
});