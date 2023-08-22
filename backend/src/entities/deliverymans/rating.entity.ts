import BaseEntity from "../base.entity";
import DeliverymanEntity from "./deliveryman.entity";

export default class RatingEntity extends BaseEntity {
  //client: Client;
  client: string;
  score: number;
  deliveryman: DeliverymanEntity;


  constructor(data: RatingEntity) {
    super(data.id || '');
    this.client = data.client;
    this.score = data.score;
    this.deliveryman = data.deliveryman;
  }
}