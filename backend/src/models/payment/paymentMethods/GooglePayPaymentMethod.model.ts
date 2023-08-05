import BaseModel from '../../base.model';

export default class CreditCardPaymentMethodModel extends BaseModel {
  name: string;

  constructor(data: CreditCardPaymentMethodModel) {
    super(data.id || '');
    this.name = data.name;
  }
}