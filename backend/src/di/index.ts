import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import TestService from '../services/test.service';
import Injector from './injector';
import CustomerRepository from '../repositories/customers/customer.repository';
import CustomerService from '../services/customers/customer.service';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerRepository(CustomerRepository, new CustomerRepository());

di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);

di.registerService(
  CustomerService,
  new CustomerService(
    di.getRepository(CustomerRepository)
  )
);
