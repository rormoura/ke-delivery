import CustomerEntity from "../entities/customer/customer.entity";


export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {
      customers: [],
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
    };
  }
}