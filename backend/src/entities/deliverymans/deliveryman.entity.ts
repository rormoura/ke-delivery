import BaseEntity from "../base.entity";

export default class DeliverymanEntity extends BaseEntity {
  name: string;
  email: string;
  numOrders: number;
  numRates: number;


  constructor(data: DeliverymanEntity) {
    super(data.id || '');
    this.name = data.name;
    this.email = data.email;
    this.numOrders = data.numOrders;
    this.numRates = data.numRates;
  }
}
