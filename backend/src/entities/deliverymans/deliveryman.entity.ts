import BaseEntity from "../base.entity";

export default class DeliverymanEntity extends BaseEntity {
  id: string;
  name: string;
  email: string;
  numOrders: string;
  numRates: string;


  constructor(data: DeliverymanEntity) {
    super(data.id || '');
    this.name = data.name;
    this.email = data.email;
    this.numOrders = data.numOrders;
    this.numRates = data.numRates;
  }
}
