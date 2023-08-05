import BaseModel from '../../base.model';

export default class CashPaymentMethodModel extends BaseModel {
  name: string;

  constructor(data: CashPaymentMethodModel) {
    super(data.id || '');
    this.name = data.name;
  }
}