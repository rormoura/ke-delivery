import BaseModel from '../../base.model';

export default class GooglePayPaymentMethodModel extends BaseModel {
  name: string;
  default: string;

  constructor(data: GooglePayPaymentMethodModel) {
    super(data.id || '');
    this.name = data.name;
    this.default = data.default;
  }
}