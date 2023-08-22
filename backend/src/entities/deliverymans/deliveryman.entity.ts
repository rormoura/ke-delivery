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
    if(!data.numOrders){
      this.numOrders = "0";
    }else{
      this.numOrders = data.numOrders;
    }
    if(!data.numRates){
      this.numRates = "0";
    }else{
      this.numRates = data.numRates;
    }
    
  }
}
