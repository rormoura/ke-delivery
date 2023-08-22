import CustomerEntity from '../../entities/customer/customer.entity';
import BaseRepository from '../base.repository';

class CustomerRepository extends BaseRepository<CustomerEntity> {
  constructor() {
    super('clientes');
  }

  public async getCustomers(): Promise<CustomerEntity[]> {
    return await this.findAll();
  }

  public async getCustomer(id: string): Promise<CustomerEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createCustomer(data: CustomerEntity): Promise<CustomerEntity> {
    return await this.add(data);
  }

  public async updateCustomer(
    id: string,
    data: Partial<CustomerEntity>
  ): Promise<CustomerEntity | null> {
    console.log('vamooo', this.update);
    console.log('ENTRAAAAAAAAA', id);
    return await this.update((item) => item.id === id, data);
  }

  public async deleteCustomer(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default CustomerRepository;