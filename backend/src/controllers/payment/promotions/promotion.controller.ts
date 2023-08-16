import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../../utils/result';
import PromotionService from '../../../services/payment/promotions/promotion.service';
import PromotionEntity from '../../../entities/payment/promotions/promotion.entity';

class PromotionController {
  private prefix: string = '/promotions';
  public router: Router;
  private promotionService: PromotionService;

  constructor(router: Router, promotionService: PromotionService) {
    this.router = router;
    this.promotionService = promotionService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getPromotions(req, res)
    );

    this.router.get(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.getPromotion(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createPromotion(req, res)
    );
    this.router.put(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.updatePromotion(req, res)
    );
    this.router.delete(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.deletePromotion(req, res)
    );
  }

  private async getPromotions(req: Request, res: Response) {
    const promotions = await this.promotionService.getPromotions();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: promotions,
    }).handle(res);
  }

  private async getPromotion(req: Request, res: Response) {
    const promotion = await this.promotionService.getPromotion(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: promotion,
    }).handle(res);
  }

  private async createPromotion(req: Request, res: Response) {
    const promotion = await this.promotionService.createPromotion(new PromotionEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: promotion,
    }).handle(res);
  }

  private async updatePromotion(req: Request, res: Response) {
    const promotion = await this.promotionService.updatePromotion(
      req.params.name,
      new PromotionEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: promotion,
    }).handle(res);
  }

  private async deletePromotion(req: Request, res: Response) {
    await this.promotionService.deletePromotion(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default PromotionController;
