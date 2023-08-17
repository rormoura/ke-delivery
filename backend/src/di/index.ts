import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import DeliverymanRepository from '../repositories/deliverymans/deliveryman.repository';
import TestService from '../services/test.service';
import DeliverymanService from '../services/deliverymans/deliveryman.service';
import Injector from './injector';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerRepository(DeliverymanRepository, new DeliverymanRepository())
di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);
di.registerService(
  DeliverymanService,
  new DeliverymanService(
    di.getRepository(DeliverymanRepository)
  )
);
