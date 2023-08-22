import BaseModel from '../../base.model';

export default class CreditCardPaymentMethodModel extends BaseModel {
  name: string;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  default: string;

  constructor(data: CreditCardPaymentMethodModel) {
    super(data.id || '');
    this.name = data.name;
    this.cardNumber = data.cardNumber;
    this.cardHolderName = data.cardHolderName;
    this.expirationDate = data.expirationDate;
    this.cvv = data.cvv;
    this.default = data.default;
  }
}