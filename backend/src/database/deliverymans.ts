import DeliverymanEntity from "../entities/deliverymans/deliveryman.entity";
import RatingEntity from "../entities/deliverymans/rating.entity";

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {
      entregadores: [],
      rating: [],
    };
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }

  static seed() {
    Database.getInstance().data = {
        entregadores: [],
    };
  }
}