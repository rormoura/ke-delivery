import CashPaymentMethodEntity from '../../../entities/payment/paymentMethods/CashPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class CashPaymentMethodRepository extends BaseRepository<CashPaymentMethodEntity> {
  constructor() {
    super('cash');
  }

  public async getTests(): Promise<CashPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getTest(id: string): Promise<CashPaymentMethodEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createTest(data: CashPaymentMethodEntity): Promise<CashPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateTest(
    id: string,
    data: CashPaymentMethodEntity
  ): Promise<CashPaymentMethodEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteTest(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default CashPaymentMethodRepository;
