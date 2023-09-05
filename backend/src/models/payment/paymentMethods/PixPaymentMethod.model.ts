import BaseModel from '../../base.model';

export default class PixPaymentMethodModel extends BaseModel {
  name: string;
  default: string;

  constructor(data: PixPaymentMethodModel) {
    super(data.id || '');
    this.name = data.name;
    this.default = data.default;
  }
}