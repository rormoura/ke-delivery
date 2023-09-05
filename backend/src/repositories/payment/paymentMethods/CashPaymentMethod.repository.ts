import CashPaymentMethodEntity from '../../../entities/payment/paymentMethods/CashPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class CashPaymentMethodRepository extends BaseRepository<CashPaymentMethodEntity> {
  constructor() {
    super('cash');
  }

  public async getCashPaymentMethods(): Promise<CashPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getCashPaymentMethod(name: string): Promise<CashPaymentMethodEntity | null> {
    return await this.findOne((item) => item.name === name);
  }

  public async createCashPaymentMethod(data: CashPaymentMethodEntity): Promise<CashPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateCashPaymentMethod(
    name: string,
    data: CashPaymentMethodEntity
  ): Promise<CashPaymentMethodEntity | null> {
    return await this.update((item) => item.name === name, data);
  }

  public async deleteCashPaymentMethod(name: string): Promise<void> {
    await this.delete((item) => item.name !== name);
  }
}

export default CashPaymentMethodRepository;
