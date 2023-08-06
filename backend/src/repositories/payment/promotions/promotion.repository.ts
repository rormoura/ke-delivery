import PromotionEntity from '../../../entities/payment/promotions/promotion.entity';
import BaseRepository from '../../payment.base.repository';

class PromotionRepository extends BaseRepository<PromotionEntity> {
  constructor() {
    super('promotions');
  }

  public async getPromotions(): Promise<PromotionEntity[]> {
    return await this.findAll();
  }

  public async getPromotion(id: string): Promise<PromotionEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createPromotion(data: PromotionEntity): Promise<PromotionEntity> {
    return await this.add(data);
  }

  public async updatePromotion(
    id: string,
    data: PromotionEntity
  ): Promise<PromotionEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deletePromotion(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default PromotionRepository;
