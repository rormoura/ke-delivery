import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../utils/result';
import CustomerService from '../../services/customers/customer.service';
import CustomerEntity from '../../entities/customer/customer.entity';

class CustomerController {
  private prefix: string = '/customers';
  public router: Router;
  private customerService: CustomerService;

  constructor(router: Router, customerService: CustomerService) {
    this.router = router;
    this.customerService = customerService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getCustomers(req, res)
    );

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getCustomer(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createCustomer(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateCustomer(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteCustomer(req, res)
    );
  }

  private async getCustomers(req: Request, res: Response) {
    const customers = await this.customerService.getCustomers();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: customers,
    }).handle(res);
  }

  private async getCustomer(req: Request, res: Response) {
    const customer = await this.customerService.getCustomer(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: customer,
    }).handle(res);
  }

  private async createCustomer(req: Request, res: Response) {
    const customer = await this.customerService.createCustomer(new CustomerEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: customer,
    }).handle(res);
  }

  private async updateCustomer(req: Request, res: Response) {
    const customer = await this.customerService.updateCustomer(
      req.params.id,
      new CustomerEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: customer,
    }).handle(res);
  }

  private async deleteCustomer(req: Request, res: Response) {
    await this.customerService.deleteCustomer(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default CustomerController;