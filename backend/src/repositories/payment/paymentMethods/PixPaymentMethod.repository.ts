import PixPaymentMethodEntity from '../../../entities/payment/paymentMethods/PixPaymentMethod.entity';
import BaseRepository from '../../payment.base.repository';

class PixPaymentMethodRepository extends BaseRepository<PixPaymentMethodEntity> {
  constructor() {
    super('pix');
  }

  public async getPixPaymentMethods(): Promise<PixPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getPixPaymentMethod(id: string): Promise<PixPaymentMethodEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createPixPaymentMethod(data: PixPaymentMethodEntity): Promise<PixPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updatePixPaymentMethod(
    id: string,
    data: PixPaymentMethodEntity
  ): Promise<PixPaymentMethodEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deletePixPaymentMethod(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default PixPaymentMethodRepository;
