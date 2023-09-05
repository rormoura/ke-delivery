import BaseEntity from "../base.entity";

export default class MenuEntity extends BaseEntity {
  id: string;
  name: string;
  restaurantId: string;
  price: number;

  constructor(data: MenuEntity) {
    super(data.id || '');
    this.name = data.name;
    this.restaurantId = data.restaurantId
    this.price = data.price
  }
}