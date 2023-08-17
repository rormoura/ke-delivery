import BaseModel from "../base.model";

export default class DeliverymanModel extends BaseModel {
  name: string;
  email: string;
  numOrders: number;
  numRates: number;


  constructor(data: DeliverymanModel) {
    super(data.id || '');
    this.name = data.name;
    this.email = data.email;
    this.numOrders = 0;
    this.numRates = 0;
  }
}
