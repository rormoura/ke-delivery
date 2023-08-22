import BaseModel from "../base.model";

export default class DeliverymanModel extends BaseModel {
  id: string;
  name: string;
  email: string;
  numOrders: string;
  numRates: string;


  constructor(data: DeliverymanModel) {
    super(data.id || '');
    this.name = data.name;
    this.email = data.email;
    this.numOrders = data.numOrders;
    this.numRates = data.numRates;
  }
}
