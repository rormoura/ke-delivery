import BaseEntity from '../../base.entity';

export default class CreditCardPaymentMethodEntity extends BaseEntity {
  name: string;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  default: string;

  constructor(data: CreditCardPaymentMethodEntity) {
    super(data.id || '');
    this.name = data.name;
    this.cardNumber = data.cardNumber;
    this.cardHolderName = data.cardHolderName;
    this.expirationDate = data.expirationDate;
    this.cvv = data.cvv;
    this.default = "yes";
  }
}