import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import PedidoController from '../controllers/Pedidos/pedido.controller';
import PedidoService from '../services/Pedidos/pedido.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new PedidoController(router, di.getService(PedidoService)).router
  );
};
