import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import DeliverymanController from '../controllers/deliverymans/deliveryman.controller';
import DeliverymanService from '../services/deliverymans/deliveryman.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new DeliverymanController(router, di.getService(DeliverymanService)).router
  );
};
