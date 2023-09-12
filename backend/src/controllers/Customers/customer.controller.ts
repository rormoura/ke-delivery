import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../utils/result';
import CustomerService from '../../services/customers/customer.service';
import CustomerEntity from '../../entities/customer/customer.entity';
import { HttpError, HttpInternalServerError } from '../../utils/errors/http.error';

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
    this.router.post(`${this.prefix}/login`, (req: Request, res: Response) =>
      this.handleRequest(() => this.customerService.loginCustomer(req.body.email , req.body.password), req, res)
    );  
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.handleRequest(() => this.customerService.getCustomers(), req, res)
    );

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.handleRequest(() => this.customerService.getCustomer(req.params.id), req, res)
    );

    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.handleRequest(() => this.customerService.createCustomer(new CustomerEntity(req.body)), req, res)
    );

    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.handleRequest(() => this.customerService.updateCustomer(req.params.id, new CustomerEntity(req.body)), req, res)
    );

    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.handleRequest(() => this.customerService.deleteCustomer(req.params.id), req, res)
    );

  }

  

  private async handleRequest(action: () => Promise<any>, req: Request, res: Response) {
    try {
      const result = await action();
      new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: result,
      }).handle(res);
    } catch (error) {
      
      if (error instanceof HttpError) {
        error.handle(res);
      } else {
        const unknownError: unknown = error;
        if (unknownError instanceof Error) {
          new HttpInternalServerError({
            msg: unknownError.message,
            msgCode: 'internal_server_error',
          }).handle(res);
        } else {
          res.status(500).json({ error: 'Erro interno do servidor' });
        }
      }
    }
  }
  
}

export default CustomerController;