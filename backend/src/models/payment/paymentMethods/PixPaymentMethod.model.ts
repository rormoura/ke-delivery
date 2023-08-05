import BaseModel from '../../base.model';

export default class PixPaymentMethodModel extends BaseModel {
  name: string;

  constructor(data: PixPaymentMethodModel) {
    super(data.id || '');
    this.name = data.name;
  }
}