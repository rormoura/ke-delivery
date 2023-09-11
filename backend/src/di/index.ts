import CreditCardPaymentMethodRepository from '../repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import CashPaymentMethodRepository from '../repositories/payment/paymentMethods/CashPaymentMethod.repository';
import PixPaymentMethodRepository from '../repositories/payment/paymentMethods/PixPaymentMethod.repository';
import GooglePayPaymentMethodRepository from '../repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import PromotionRepository from '../repositories/payment/promotions/promotion.repository';
import BaseRepository from '../repositories/base.repository';
import CreditCardPaymentMethodService from '../services/payment/paymentMethods/CreditCardPaymentMethod.service';
import CashPaymentMethodService from '../services/payment/paymentMethods/CashPaymentMethod.service';
import PixPaymentMethodService from '../services/payment/paymentMethods/PixPaymentMethod.service';
import GooglePayPaymentMethodService from '../services/payment/paymentMethods/GooglePayPaymentMethod.service';
import PromotionService from '../services/payment/promotions/promotion.service';
import PaymentMethodsService from '../services/payment/paymentMethods/PaymentMethods.service'
import PedidosRepository from '../repositories/Pedidos/pedido.repository';
import PedidosService from '../services/Pedidos/pedido.service';
import TestService from '../services/test.service';
import TestRepository from '../repositories/test.repository';
import OtherRepository from '../repositories/other.repository';
import DeliverymanRepository from '../repositories/deliverymans/deliveryman.repository';
import DeliverymanService from '../services/deliverymans/deliveryman.service';
import MenuRepository from '../repositories/menu/menu.repository';
import MenuService from '../services/menu/menu.service';
import RestaurantRepository from '../repositories/restaurant.repository';
import RestaurantService from '../services/restaurant.service';
import Injector from './injector';
import CustomerRepository from '../repositories/customers/customer.repository';
import CustomerService from '../services/customers/customer.service';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerRepository(DeliverymanRepository, new DeliverymanRepository());
di.registerRepository(MenuRepository, new MenuRepository());
di.registerRepository(RestaurantRepository, new RestaurantRepository());
di.registerRepository(CustomerRepository, new CustomerRepository());

di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);
// Test
di.registerRepository(BaseRepository, new BaseRepository('paymentMethods'));
di.registerRepository(CreditCardPaymentMethodRepository, new CreditCardPaymentMethodRepository());
di.registerRepository(CashPaymentMethodRepository, new CashPaymentMethodRepository());
di.registerRepository(PixPaymentMethodRepository, new PixPaymentMethodRepository());
di.registerRepository(GooglePayPaymentMethodRepository, new GooglePayPaymentMethodRepository());
di.registerRepository(PromotionRepository, new PromotionRepository());
di.registerService(
  CreditCardPaymentMethodService,
  new CreditCardPaymentMethodService(
    di.getRepository(CreditCardPaymentMethodRepository),
  )
);
di.registerService(
  CashPaymentMethodService,
  new CashPaymentMethodService(
    di.getRepository(CashPaymentMethodRepository),
  )
);
di.registerService(
  PixPaymentMethodService,
  new PixPaymentMethodService(
    di.getRepository(PixPaymentMethodRepository),
  )
);
di.registerService(
  GooglePayPaymentMethodService,
  new GooglePayPaymentMethodService(
    di.getRepository(GooglePayPaymentMethodRepository),
  )
);
di.registerService(
  PromotionService,
  new PromotionService(
    di.getRepository(PromotionRepository),
  )
);
di.registerService(
  PaymentMethodsService,
  new PaymentMethodsService(
    di.getRepository(CashPaymentMethodRepository),
    di.getRepository(CreditCardPaymentMethodRepository),
    di.getRepository(PixPaymentMethodRepository),
    di.getRepository(GooglePayPaymentMethodRepository)
  )
);
di.registerService(
  DeliverymanService,
  new DeliverymanService(
    di.getRepository(DeliverymanRepository)
  )
);
di.registerService(
  MenuService,
  new MenuService(
    di.getRepository(MenuRepository)
  )
);

//Pedidos
di.registerRepository(PedidosRepository, new PedidosRepository());
di.registerService(
  PedidosService,
  new PedidosService(
    di.getRepository(PedidosRepository)
  )
  );

di.registerService(
  RestaurantService,
  new RestaurantService(
    di.getRepository(RestaurantRepository)
  )
);

di.registerService(
  CustomerService,
  new CustomerService(
    di.getRepository(CustomerRepository)
  )
);
