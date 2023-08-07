import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../../utils/result';
import CreditCardPaymentMethodService from '../../../services/payment/paymentMethods/CreditCardPaymentMethod.service';
import CreditCardPaymentMethodEntity from '../../../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';

class CreditCardPaymentMethodController {
  private prefix: string = '/paymentMethods/creditCard';
  public router: Router;
  private creditCardPaymentMethodService: CreditCardPaymentMethodService;

  constructor(router: Router, creditCardPaymentMethodService: CreditCardPaymentMethodService) {
    this.router = router;
    this.creditCardPaymentMethodService = creditCardPaymentMethodService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getCreditCardPaymentMethods(req, res)
    );

    this.router.get(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.getCreditCardPaymentMethod(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createCreditCardPaymentMethod(req, res)
    );
    this.router.put(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.updateCreditCardPaymentMethod(req, res)
    );
    this.router.delete(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.deleteCreditCardPaymentMethod(req, res)
    );
  }

  private async getCreditCardPaymentMethods(req: Request, res: Response) {
    const creditCardPaymentMethods = await this.creditCardPaymentMethodService.getCreditCardPaymentMethods();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: creditCardPaymentMethods,
    }).handle(res);
  }

  private async getCreditCardPaymentMethod(req: Request, res: Response) {
    const creditCardPaymentMethod = await this.creditCardPaymentMethodService.getCreditCardPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: creditCardPaymentMethod,
    }).handle(res);
  }

  private async createCreditCardPaymentMethod(req: Request, res: Response) {
    const creditCardPaymentMethod = await this.creditCardPaymentMethodService.createCreditCardPaymentMethod(new CreditCardPaymentMethodEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: creditCardPaymentMethod,
    }).handle(res);
  }

  private async updateCreditCardPaymentMethod(req: Request, res: Response) {
    const creditCardPaymentMethod = await this.creditCardPaymentMethodService.updateCreditCardPaymentMethod(
      req.params.name,
      new CreditCardPaymentMethodEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: creditCardPaymentMethod,
    }).handle(res);
  }

  private async deleteCreditCardPaymentMethod(req: Request, res: Response) {
    await this.creditCardPaymentMethodService.deleteCreditCardPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default CreditCardPaymentMethodController;
