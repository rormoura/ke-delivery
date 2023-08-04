import CashPaymentMethodEntity from '../../../entities/payment/paymentMethods/CashPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class CashPaymentMethodRepository extends BaseRepository<CashPaymentMethodEntity> {
  constructor() {
    super('cash');
  }

  public async getCashPaymentMethods(): Promise<CashPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getCashPaymentMethod(id: string): Promise<CashPaymentMethodEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createCashPaymentMethod(data: CashPaymentMethodEntity): Promise<CashPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateCashPaymentMethod(
    id: string,
    data: CashPaymentMethodEntity
  ): Promise<CashPaymentMethodEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteCashPaymentMethod(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default CashPaymentMethodRepository;
