import BaseModel from "../base.model";

export default class MenuModel extends BaseModel {
    id: string;
    name: string;
    restaurantId: string;
    price: number;


  constructor(data: MenuModel) {
    super(data.id || '');
    this.name = data.name;
    this.restaurantId = data.restaurantId
    this.price = data.price
  }
}