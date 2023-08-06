import CreditCardPaymentMethodEntity from '../../../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import BaseRepository from '../../payment.base.repository';

class CreditCardPaymentMethodRepository extends BaseRepository<CreditCardPaymentMethodEntity> {
  constructor() {
    super('creditcard');
  }

  public async getCreditCardPaymentMethods(): Promise<CreditCardPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getCreditCardPaymentMethod(id: string): Promise<CreditCardPaymentMethodEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createCreditCardPaymentMethod(data: CreditCardPaymentMethodEntity): Promise<CreditCardPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateCreditCardPaymentMethod(
    id: string,
    data: CreditCardPaymentMethodEntity
  ): Promise<CreditCardPaymentMethodEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteCreditCardPaymentMethod(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default CreditCardPaymentMethodRepository;
