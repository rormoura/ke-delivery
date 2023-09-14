import CreditCardPaymentMethodEntity from '../../../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class CreditCardPaymentMethodRepository extends BaseRepository<CreditCardPaymentMethodEntity> {
  constructor() {
    super('creditcard');
  }

  public async getCreditCardPaymentMethods(): Promise<CreditCardPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getCreditCardPaymentMethod(name: string): Promise<CreditCardPaymentMethodEntity | null> {
    return await this.findOne((item) => item.name === name);
  }

  public async createCreditCardPaymentMethod(data: CreditCardPaymentMethodEntity): Promise<CreditCardPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateCreditCardPaymentMethod(
    name: string,
    data: CreditCardPaymentMethodEntity
  ): Promise<CreditCardPaymentMethodEntity | null> {
    return await this.update((item) => item.name === name, data);
  }

  public async deleteCreditCardPaymentMethod(name: string): Promise<void> {
    await this.delete((item) => item.name !== name);
  }
}

export default CreditCardPaymentMethodRepository;
