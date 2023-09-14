import PixPaymentMethodEntity from '../../../entities/payment/paymentMethods/PixPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class PixPaymentMethodRepository extends BaseRepository<PixPaymentMethodEntity> {
  constructor() {
    super('pix');
  }

  public async getPixPaymentMethods(): Promise<PixPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getPixPaymentMethod(name: string): Promise<PixPaymentMethodEntity | null> {
    return await this.findOne((item) => item.name === name);
  }

  public async createPixPaymentMethod(data: PixPaymentMethodEntity): Promise<PixPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updatePixPaymentMethod(
    name: string,
    data: PixPaymentMethodEntity
  ): Promise<PixPaymentMethodEntity | null> {
    return await this.update((item) => item.name === name, data);
  }

  public async deletePixPaymentMethod(name: string): Promise<void> {
    await this.delete((item) => item.name !== name);
  }
}

export default PixPaymentMethodRepository;
