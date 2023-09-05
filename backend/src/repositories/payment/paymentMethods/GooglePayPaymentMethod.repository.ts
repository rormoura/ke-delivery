import GooglePayPaymentMethodEntity from '../../../entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class GooglePayPaymentMethodRepository extends BaseRepository<GooglePayPaymentMethodEntity> {
  constructor() {
    super('googlepay');
  }

  public async getGooglePayPaymentMethods(): Promise<GooglePayPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getGooglePayPaymentMethod(name: string): Promise<GooglePayPaymentMethodEntity | null> {
    return await this.findOne((item) => item.name === name);
  }

  public async createGooglePayPaymentMethod(data: GooglePayPaymentMethodEntity): Promise<GooglePayPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateGooglePayPaymentMethod(
    name: string,
    data: GooglePayPaymentMethodEntity
  ): Promise<GooglePayPaymentMethodEntity | null> {
    return await this.update((item) => item.name === name, data);
  }

  public async deleteGooglePayPaymentMethod(name: string): Promise<void> {
    await this.delete((item) => item.name !== name);
  }
}

export default GooglePayPaymentMethodRepository;
