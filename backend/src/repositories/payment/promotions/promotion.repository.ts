import PromotionEntity from '../../../entities/payment/promotions/promotion.entity';
import BaseRepository from '../../base.repository';

class PromotionRepository extends BaseRepository<PromotionEntity> {
  constructor() {
    super('promotions');
  }

  public async getPromotions(): Promise<PromotionEntity[]> {
    return await this.findAll();
  }

  public async getPromotion(name: string): Promise<PromotionEntity | null> {
    return await this.findOne((item) => item.name === name);
  }

  public async createPromotion(data: PromotionEntity): Promise<PromotionEntity> {
    return await this.add(data);
  }

  public async updatePromotion(
    name: string,
    data: PromotionEntity
  ): Promise<PromotionEntity | null> {
    return await this.update((item) => item.name === name, data);
  }

  public async deletePromotion(name: string): Promise<void> {
    await this.delete((item) => item.name !== name);
  }
}

export default PromotionRepository;
