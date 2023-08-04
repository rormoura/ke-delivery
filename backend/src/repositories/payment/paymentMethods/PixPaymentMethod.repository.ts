import PixPaymentMethodEntity from '../../../entities/payment/paymentMethods/PixPaymentMethod.entity';
import BaseRepository from '../../base.repository';

class PixPaymentMethodRepository extends BaseRepository<PixPaymentMethodEntity> {
  constructor() {
    super('tests');
  }

  public async getTests(): Promise<PixPaymentMethodEntity[]> {
    return await this.findAll();
  }

  public async getTest(id: string): Promise<PixPaymentMethodEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createTest(data: PixPaymentMethodEntity): Promise<PixPaymentMethodEntity> {
    return await this.add(data);
  }

  public async updateTest(
    id: string,
    data: PixPaymentMethodEntity
  ): Promise<PixPaymentMethodEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteTest(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default PixPaymentMethodRepository;
