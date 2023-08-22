import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../utils/result';
import DeliverymanService from '../../services/deliverymans/deliveryman.service';
import DeliverymanEntity from '../../entities/deliverymans/deliveryman.entity';

class DeliverymanController {
  private prefix: string = '/entregadores';
  public router: Router;
  private deliverymanService: DeliverymanService;

  constructor(router: Router, deliverymanService: DeliverymanService) {
    this.router = router;
    this.deliverymanService = deliverymanService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getDeliverymans(req, res)
    );

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getDeliveryman(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createDeliveryman(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateDeliveryman(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteDeliveryman(req, res)
    );
  }

  private async getDeliverymans(req: Request, res: Response) {
    const entregadores = await this.deliverymanService.getDeliverymans();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: entregadores,
    }).handle(res);
  }

  private async getDeliveryman(req: Request, res: Response) {
    const test = await this.deliverymanService.getDeliveryman(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async createDeliveryman(req: Request, res: Response) {
    const test = await this.deliverymanService.createDeliveryman(new DeliverymanEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async updateDeliveryman(req: Request, res: Response) {
    const test = await this.deliverymanService.updateDeliveryman(
      req.params.id,
      new DeliverymanEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async deleteDeliveryman(req: Request, res: Response) {
    await this.deliverymanService.deleteDeliveryman(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default DeliverymanController;
