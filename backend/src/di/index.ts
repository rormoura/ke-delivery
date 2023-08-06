import CreditCardPaymentMethodRepository from '../repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import CashPaymentMethodRepository from '../repositories/payment/paymentMethods/CashPaymentMethod.repository';
import PixPaymentMethodRepository from '../repositories/payment/paymentMethods/PixPaymentMethod.repository';
import GooglePayPaymentMethodRepository from '../repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import PromotionRepository from '../repositories/payment/promotions/promotion.repository';
import PaymentMethodsRepository from '../repositories/payment.base.repository';
import CreditCardPaymentMethodService from '../services/payment/paymentMethods/CreditCardPaymentMethod.service';
import CashPaymentMethodService from '../services/payment/paymentMethods/CashPaymentMethod.service';
import PixPaymentMethodService from '../services/payment/paymentMethods/PixPaymentMethod.service';
import GooglePayPaymentMethodService from '../services/payment/paymentMethods/GooglePayPaymentMethod.service';
import PromotionService from '../services/payment/promotions/promotion.service';
import PaymentMethodsService from '../services/payment/paymentMethods/PaymentMethods.service'
import TestService from '../services/test.service';
import TestRepository from '../repositories/test.repository';
import OtherRepository from '../repositories/other.repository';
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
// Test
di.registerRepository(PaymentMethodsRepository, new PaymentMethodsRepository('paymentMethods'));
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
