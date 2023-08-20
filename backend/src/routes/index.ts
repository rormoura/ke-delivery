import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import RestaurantController from '../controllers/restaurant.controller';
import RestaurantService from '../services/restaurant.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new RestaurantController(router, di.getService(RestaurantService)).router
  );
};
