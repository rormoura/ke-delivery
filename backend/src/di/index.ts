import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import RestaurantRepository from '../repositories/restaurant.repository';
import TestService from '../services/test.service';
import RestaurantService from '../services/restaurant.service';
import Injector from './injector';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerRepository(RestaurantRepository, new RestaurantRepository());
di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);
di.registerService(
  RestaurantService,
  new RestaurantService(
    di.getRepository(RestaurantRepository)
  )
);
