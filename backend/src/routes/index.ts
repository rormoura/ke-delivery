import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import CustomerController from '../controllers/Customers/customer.controller';
import CustomerService from '../services/customers/customer.service';



const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new CustomerController(router, di.getService(CustomerService)).router
  );

  
};
