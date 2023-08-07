import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../../utils/result';
import CashPaymentMethodService from '../../../services/payment/paymentMethods/CashPaymentMethod.service';
import CashPaymentMethodEntity from '../../../entities/payment/paymentMethods/CashPaymentMethod.entity';

class CashPaymentMethodController {
  private prefix: string = '/paymentMethods/cash';
  public router: Router;
  private cashPaymentMethodService: CashPaymentMethodService;

  constructor(router: Router, cashPaymentMethodService: CashPaymentMethodService) {
    this.router = router;
    this.cashPaymentMethodService = cashPaymentMethodService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getCashPaymentMethods(req, res)
    );

    this.router.get(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.getCashPaymentMethod(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createCashPaymentMethod(req, res)
    );
    this.router.put(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.updateCashPaymentMethod(req, res)
    );
    this.router.delete(`${this.prefix}/:name`, (req: Request, res: Response) =>
      this.deleteCashPaymentMethod(req, res)
    );
  }

  private async getCashPaymentMethods(req: Request, res: Response) {
    const cashPaymentMethods = await this.cashPaymentMethodService.getCashPaymentMethods();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: cashPaymentMethods,
    }).handle(res);
  }

  private async getCashPaymentMethod(req: Request, res: Response) {
    const cashPaymentMethod = await this.cashPaymentMethodService.getCashPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: cashPaymentMethod,
    }).handle(res);
  }

  private async createCashPaymentMethod(req: Request, res: Response) {
    const cashPaymentMethod = await this.cashPaymentMethodService.createCashPaymentMethod(new CashPaymentMethodEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: cashPaymentMethod,
    }).handle(res);
  }

  private async updateCashPaymentMethod(req: Request, res: Response) {
    const cashPaymentMethod = await this.cashPaymentMethodService.updateCashPaymentMethod(
      req.params.name,
      new CashPaymentMethodEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: cashPaymentMethod,
    }).handle(res);
  }

  private async deleteCashPaymentMethod(req: Request, res: Response) {
    await this.cashPaymentMethodService.deleteCashPaymentMethod(req.params.name);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default CashPaymentMethodController;
