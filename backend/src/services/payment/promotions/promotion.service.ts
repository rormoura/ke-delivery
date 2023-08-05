import PromotionEntity from '../../../entities/payment/promotions/promotion.entity';
import PromotionModel from '../../../models/payment/promotions/promotion.model';
import PromotionRepository from '../../../repositories/payment/promotions/promotion.repository';
import { HttpNotFoundError } from '../../../utils/errors/http.error';

class PromotionServiceMessageCode {
  public static readonly Promotion_not_found = 'Promotion_not_found';
}

class PromotionService {
  private PromotionRepository: PromotionRepository;

  constructor(
    PromotionRepository: PromotionRepository,
  ) {
    this.PromotionRepository = PromotionRepository;
  }

  public async getPromotions(): Promise<PromotionModel[]> {
    const PromotionEntity = await this.PromotionRepository.getPromotions();

    const promotionModel = PromotionEntity.map((Promotion) => new PromotionModel(Promotion));

    return promotionModel;
  }

  public async getPromotion(id: string): Promise<PromotionModel> {
    const PromotionEntity = await this.PromotionRepository.getPromotion(id);

    if (!PromotionEntity) {
      throw new HttpNotFoundError({
        msg: 'Promotion not found',
        msgCode: PromotionServiceMessageCode.Promotion_not_found,
      });
    }

    const promotionModel = new PromotionModel(PromotionEntity);

    return promotionModel;
  }

  public async createPromotion(data: PromotionEntity): Promise<PromotionModel> {
    const PromotionEntity = await this.PromotionRepository.createPromotion(data);
    const promotionModel = new PromotionModel(PromotionEntity);

    return promotionModel;
  }

  public async updatePromotion(id: string, data: PromotionEntity): Promise<PromotionModel> {
    const PromotionEntity = await this.PromotionRepository.updatePromotion(id, data);

    if (!PromotionEntity) {
      throw new HttpNotFoundError({
        msg: 'Promotion not found',
        msgCode: PromotionServiceMessageCode.Promotion_not_found,
      });
    }

    const promotionModel = new PromotionModel(PromotionEntity);

    return promotionModel;
  }

  public async deletePromotion(id: string): Promise<void> {
    await this.PromotionRepository.deletePromotion(id);
  }
}

export default PromotionService;
