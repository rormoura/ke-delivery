import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../../utils/result';
import PaymentMethodsService from '../../../services/payment/paymentMethods/PaymentMethods.service';

class PaymentMethodsController {
  private prefix: string = '/paymentMethods';
  public router: Router;
  private paymentMethodsService: PaymentMethodsService;

  constructor(router: Router, paymentMethodsService: PaymentMethodsService) {
    this.router = router;
    this.paymentMethodsService = paymentMethodsService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getPaymentMethods(req, res)
    );
    this.router.put(`${this.prefix}/default/:name`, (req: Request, res: Response) =>
      this.updateDefaultPaymentMethod(req, res)
    );
    this.router.get(`${this.prefix}/default`, (req: Request, res: Response) =>
      this.getDefaultPaymentMethod(req, res)
    );
    this.router.get(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.getPaymentMethod(req, res)
    );
  }

  private async getPaymentMethods(req: Request, res: Response) {
    const paymentMethods = await this.paymentMethodsService.getPaymentMethods();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: paymentMethods,
    }).handle(res);
  }

  private async getPaymentMethod(req: Request, res: Response) {
    const paymentMethod = await this.paymentMethodsService.getPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: paymentMethod,
    }).handle(res);
  }

  private async getDefaultPaymentMethod(req: Request, res: Response) {
    const paymentMethods = await this.paymentMethodsService.getDefaultPaymentMethod();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: paymentMethods,
    }).handle(res);
  }

  private async updateDefaultPaymentMethod(req: Request, res: Response) {
    const newDefaultPaymentMethod = await this.paymentMethodsService.updateDefaultPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: newDefaultPaymentMethod,
    }).handle(res);
  }

}

export default PaymentMethodsController;
