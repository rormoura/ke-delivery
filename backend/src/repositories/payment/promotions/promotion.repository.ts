import PromotionEntity from '../../../entities/payment/promotions/promotion.entity';
import BaseRepository from '../../base.repository';

class PromotionRepository extends BaseRepository<PromotionEntity> {
  constructor() {
    super('promotion');
  }

  public async getTests(): Promise<PromotionEntity[]> {
    return await this.findAll();
  }

  public async getTest(id: string): Promise<PromotionEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createTest(data: PromotionEntity): Promise<PromotionEntity> {
    return await this.add(data);
  }

  public async updateTest(
    id: string,
    data: PromotionEntity
  ): Promise<PromotionEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteTest(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default PromotionRepository;
