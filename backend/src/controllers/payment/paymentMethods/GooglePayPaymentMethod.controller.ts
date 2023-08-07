import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../../utils/result';
import GooglePayPaymentMethodService from '../../../services/payment/paymentMethods/GooglePayPaymentMethod.service';
import GooglePayPaymentMethodEntity from '../../../entities/payment/paymentMethods/GooglePayPaymentMethod.entity';

class GooglePayPaymentMethodController {
  private prefix: string = '/paymentMethods/googlePay';
  public router: Router;
  private googlePayPaymentMethodService: GooglePayPaymentMethodService;

  constructor(router: Router, googlePayPaymentMethodService: GooglePayPaymentMethodService) {
    this.router = router;
    this.googlePayPaymentMethodService = googlePayPaymentMethodService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getGooglePayPaymentMethods(req, res)
    );

    this.router.get(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.getGooglePayPaymentMethod(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createGooglePayPaymentMethod(req, res)
    );
    this.router.put(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.updateGooglePayPaymentMethod(req, res)
    );
    this.router.delete(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.deleteGooglePayPaymentMethod(req, res)
    );
  }

  private async getGooglePayPaymentMethods(req: Request, res: Response) {
    const googlePayPaymentMethods = await this.googlePayPaymentMethodService.getGooglePayPaymentMethods();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: googlePayPaymentMethods,
    }).handle(res);
  }

  private async getGooglePayPaymentMethod(req: Request, res: Response) {
    const googlePayPaymentMethod = await this.googlePayPaymentMethodService.getGooglePayPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: googlePayPaymentMethod,
    }).handle(res);
  }

  private async createGooglePayPaymentMethod(req: Request, res: Response) {
    const googlePayPaymentMethod = await this.googlePayPaymentMethodService.createGooglePayPaymentMethod(new GooglePayPaymentMethodEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: googlePayPaymentMethod,
    }).handle(res);
  }

  private async updateGooglePayPaymentMethod(req: Request, res: Response) {
    const googlePayPaymentMethod = await this.googlePayPaymentMethodService.updateGooglePayPaymentMethod(
      req.params.name,
      new GooglePayPaymentMethodEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: googlePayPaymentMethod,
    }).handle(res);
  }

  private async deleteGooglePayPaymentMethod(req: Request, res: Response) {
    await this.googlePayPaymentMethodService.deleteGooglePayPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default GooglePayPaymentMethodController;
