import PromotionEntity from '../entities/payment/promotions/promotion.entity';
import CashPaymentMethodEntity from '../entities/payment/paymentMethods/CashPaymentMethod.entity';
import CreditCardPaymentMethodEntity from '../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import GooglePayPaymentMethodEntity from '../entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import PixPaymentMethodEntity from '../entities/payment/paymentMethods/PixPaymentMethod.entity';

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {
      promotions: [],
      creditcard: [],
      cash: [],
      googlepay: [],
      pix: [],
    };
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }

  static seed() {
    Database.getInstance().data = {
      promotions: [
        new PromotionEntity({
          id: '1',
          name: '10BARRA10',
          discount: '10%'
        }),
      ],
    };
  }
}
