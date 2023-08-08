import BaseEntity from '../../base.entity';

export default class GooglePayPaymentMethodEntity extends BaseEntity {
  name: string;
  default: string;

  constructor(data: GooglePayPaymentMethodEntity) {
    super(data.id || '');
    this.name = data.name;
    this.default = "no";
  }
}