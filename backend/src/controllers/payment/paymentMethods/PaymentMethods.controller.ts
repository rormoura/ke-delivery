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
  }

  private async getPaymentMethods(req: Request, res: Response) {
    const paymentMethods = await this.paymentMethodsService.getPaymentMethods();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: paymentMethods,
    }).handle(res);
  }

}

export default PaymentMethodsController;
