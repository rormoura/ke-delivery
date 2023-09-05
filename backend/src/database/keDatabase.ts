import PedidoEntity from '../entities/Pedidos/pedido.entity';
import PromotionEntity from '../entities/payment/promotions/promotion.entity';
import CustomerEntity from "../entities/customer/customer.entity";
import MenuEntity from '../entities/menu/menu.entity';

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {
      pedidos: [],
      menu: [],
      customers: [],
      entregadores: [],
      promotions: [],
      creditcard: [],
      cash: [],
      googlepay: [],
      pix: [],
    };
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }

  static seed() {
    Database.getInstance().data = {
      pedidos: [
        new PedidoEntity({
          id: "1",
          CNPJ_Restaurante: "12.345.678/0001-00",
          CPF_Cliente: "111.098.098.72",
          CPF_Entregador: "222.567.251.72",
          Data: new Date(2017, 4, 4, 17, 23, 42, 11),
          Endereco: "Avenida José Pinheiro, 358, Casa, Iputinga, Recife, Pernambuco, Brasil",
          name: '1',
          Itens: "{nome = 'Tofu', quantidade = '2', VUnit = 'R$10,00', VTot = 'R$20,00'}",
          MetodoDePagamento: "Dinheiro",
          Observacoes: "Sem cebolas",
          Status: "Finalizado",
          ValorTotal: 43.95,
        }),
      ],
      customers: [
        new CustomerEntity({
          id: '1',
          name: 'Ana Santana',
          cpf: '12345678910',
          email: 'aninha@getMaxListeners.com',
          address: 'Rua das Flores, 123',
          password: '123456',
        }),
      ],
      entregadores: [],
      promotions: [
        new PromotionEntity({
          id: '1',
          name: '10BARRA10',
          discount: '10%'
        }),
      ],
      menu: [
        new MenuEntity({
          id: '1',
          name: 'Berinjela ao forno',
          price: 32.69,
          restaurantId: '123'
        })
      ],
    };
  }
}