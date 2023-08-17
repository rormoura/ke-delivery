import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import PedidosRepository from '../repositories/Pedidos/pedido.repository';
import PedidosService from '../services/Pedidos/pedido.service';
import TestService from '../services/test.service';
import Injector from './injector';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);

//Pedidos
di.registerRepository(PedidosRepository, new PedidosRepository());
di.registerService(
  PedidosService,
  new PedidosService(
    di.getRepository(PedidosRepository),
  )
);