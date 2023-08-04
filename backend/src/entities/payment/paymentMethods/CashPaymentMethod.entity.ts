import BaseEntity from '../../base.entity';

export default class CashPaymentMethodEntity extends BaseEntity {
  name: string;

  constructor(data: CashPaymentMethodEntity) {
    super(data.id || '');
    this.name = data.name;
  }
}