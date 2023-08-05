import BaseModel from '../../base.model';

export default class GooglePayPaymentMethodModel extends BaseModel {
  name: string;

  constructor(data: GooglePayPaymentMethodModel) {
    super(data.id || '');
    this.name = data.name;
  }
}