import CreditCardPaymentMethodRepository from '../repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import CashPaymentMethodRepository from '../repositories/payment/paymentMethods/CashPaymentMethod.repository';
import PixPaymentMethodRepository from '../repositories/payment/paymentMethods/PixPaymentMethod.repository';
import GooglePayPaymentMethodRepository from '../repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import PromotionRepository from '../repositories/payment/promotions/promotion.repository';
import CreditCardPaymentMethodService from '../services/payment/paymentMethods/CreditCardPaymentMethod.service';
import CashPaymentMethodService from '../services/payment/paymentMethods/CashPaymentMethod.service';
import PixPaymentMethodService from '../services/payment/paymentMethods/PixPaymentMethod.service';
import GooglePayPaymentMethodService from '../services/payment/paymentMethods/GooglePayPaymentMethod.service';
import PromotionService from '../services/payment/promotions/promotion.service';
import Injector from './injector';

export const di = new Injector();

// Test
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
