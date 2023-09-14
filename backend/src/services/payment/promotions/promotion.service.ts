import PromotionEntity from '../../../entities/payment/promotions/promotion.entity';
import PromotionModel from '../../../models/payment/promotions/promotion.model';
import PromotionRepository from '../../../repositories/payment/promotions/promotion.repository';
import { HttpNotFoundError, HttpForbiddenError } from '../../../utils/errors/http.error';

class PromotionServiceMessageCode {
  public static readonly Promotion_not_found = 'Promotion_not_found';
  public static readonly Promotion_already_exists = 'Promotion_already_exists'
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

  public async getPromotion(name: string): Promise<PromotionModel> {
    const PromotionEntity = await this.PromotionRepository.getPromotion(name);

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
    const PromotionEntityAlreadyExists = await this.PromotionRepository.getPromotion(data.name);
    if (PromotionEntityAlreadyExists) {
      throw new HttpForbiddenError({
        msg: 'Promotion already exists',
        msgCode: PromotionServiceMessageCode.Promotion_already_exists,
      });
    }

    const PromotionEntity = await this.PromotionRepository.createPromotion(data);
    const promotionModel = new PromotionModel(PromotionEntity);

    return promotionModel;
  }

  public async updatePromotion(name: string, data: PromotionEntity): Promise<PromotionModel> {
    const PromotionEntity = await this.PromotionRepository.updatePromotion(name, data);

    if (!PromotionEntity) {
      throw new HttpNotFoundError({
        msg: 'Promotion not found',
        msgCode: PromotionServiceMessageCode.Promotion_not_found,
      });
    }

    const promotionModel = new PromotionModel(PromotionEntity);

    return promotionModel;
  }

  public async deletePromotion(name: string): Promise<void> {
    await this.PromotionRepository.deletePromotion(name);
  }
}

export default PromotionService;
