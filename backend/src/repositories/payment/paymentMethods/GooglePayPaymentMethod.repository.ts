import GooglePayPaymentMethodEntity from '../../../entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class GooglePayPaymentMethodRepository extends BaseRepository<GooglePayPaymentMethodEntity> {
  constructor() {
    super('googlepay');
  }

  public async getTests(): Promise<GooglePayPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getTest(id: string): Promise<GooglePayPaymentMethodEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createTest(data: GooglePayPaymentMethodEntity): Promise<GooglePayPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateTest(
    id: string,
    data: GooglePayPaymentMethodEntity
  ): Promise<GooglePayPaymentMethodEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteTest(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default GooglePayPaymentMethodRepository;
