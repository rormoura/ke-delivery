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
      promotions: [
        new PromotionEntity({
          id: '1',
          name: '10BARRA10',
          discount: '10%'
        }),
      ],
      creditcard: [
        new CreditCardPaymentMethodEntity({
          id: '1',
          name: 'Cartão de Crédito VISA',
          cardHolderName: 'MARIA SILVA',
          cardNumber: '123',
          expirationDate: '31/02/2026',
          cvv:'882',
          default: "no"
        }),
      ],
      cash: [
        new CashPaymentMethodEntity({
          id: '1',
          name: 'dinheiro',
          default: "no"
        }),
      ],
      googlepay: [
        new GooglePayPaymentMethodEntity({
          id: '1',
          name: 'Google Pay',
          default: "no"
        }),
      ],
      pix: [
        new PixPaymentMethodEntity({
          id: '1',
          name: 'Pix',
          default: "no"
        }),
      ],
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
