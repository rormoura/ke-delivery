import BaseEntity from '../../base.entity';

export default class PixPaymentMethodEntity extends BaseEntity {
  name: string;

  constructor(data: PixPaymentMethodEntity) {
    super(data.id || '');
    this.name = data.name;
  }
}