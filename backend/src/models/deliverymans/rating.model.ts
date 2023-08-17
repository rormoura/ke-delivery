import BaseModel from "../base.model";
import DeliverymanModel from "./deliveryman.model";

export default class RatingModel extends BaseModel {
  //client: Client;
  client: string;
  score: number;
  deliveryman: DeliverymanModel;


  constructor(data: RatingModel) {
    super(data.id || '');
    this.client = data.client;
    this.score = data.score;
    this.deliveryman = data.deliveryman;
  }
}