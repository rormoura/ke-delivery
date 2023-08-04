import CreditCardPaymentMethodEntity from '../../../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class CreditCardPaymentMethodRepository extends BaseRepository<CreditCardPaymentMethodEntity> {
  constructor() {
    super('creditcard');
  }

  public async getTests(): Promise<CreditCardPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getTest(id: string): Promise<CreditCardPaymentMethodEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createTest(data: CreditCardPaymentMethodEntity): Promise<CreditCardPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateTest(
    id: string,
    data: CreditCardPaymentMethodEntity
  ): Promise<CreditCardPaymentMethodEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteTest(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default CreditCardPaymentMethodRepository;
