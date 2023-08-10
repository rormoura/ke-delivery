import BaseModel from '../../base.model';

export default class CashPaymentMethodModel extends BaseModel {
  name: string;
  default: string;

  constructor(data: CashPaymentMethodModel) {
    super(data.id || '');
    this.name = data.name;
    this.default = data.default;
  }
}