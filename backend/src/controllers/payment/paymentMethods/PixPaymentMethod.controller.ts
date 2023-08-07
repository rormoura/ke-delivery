import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../../utils/result';
import PixPaymentMethodService from '../../../services/payment/paymentMethods/PixPaymentMethod.service';
import PixPaymentMethodEntity from '../../../entities/payment/paymentMethods/PixPaymentMethod.entity';

class PixPaymentMethodController {
  private prefix: string = '/paymentMethods/pix';
  public router: Router;
  private pixPaymentMethodService: PixPaymentMethodService;

  constructor(router: Router, pixPaymentMethodService: PixPaymentMethodService) {
    this.router = router;
    this.pixPaymentMethodService = pixPaymentMethodService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getPixPaymentMethods(req, res)
    );

    this.router.get(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.getPixPaymentMethod(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createPixPaymentMethod(req, res)
    );
    this.router.put(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.updatePixPaymentMethod(req, res)
    );
    this.router.delete(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.deletePixPaymentMethod(req, res)
    );
  }

  private async getPixPaymentMethods(req: Request, res: Response) {
    const pixPaymentMethods = await this.pixPaymentMethodService.getPixPaymentMethods();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: pixPaymentMethods,
    }).handle(res);
  }

  private async getPixPaymentMethod(req: Request, res: Response) {
    const pixPaymentMethod = await this.pixPaymentMethodService.getPixPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: pixPaymentMethod,
    }).handle(res);
  }

  private async createPixPaymentMethod(req: Request, res: Response) {
    const pixPaymentMethod = await this.pixPaymentMethodService.createPixPaymentMethod(new PixPaymentMethodEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: pixPaymentMethod,
    }).handle(res);
  }

  private async updatePixPaymentMethod(req: Request, res: Response) {
    const pixPaymentMethod = await this.pixPaymentMethodService.updatePixPaymentMethod(
      req.params.name,
      new PixPaymentMethodEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: pixPaymentMethod,
    }).handle(res);
  }

  private async deletePixPaymentMethod(req: Request, res: Response) {
    await this.pixPaymentMethodService.deletePixPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default PixPaymentMethodController;
