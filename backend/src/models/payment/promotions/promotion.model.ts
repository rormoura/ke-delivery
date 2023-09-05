import BaseModel from '../../base.model';

export default class PromotionModel extends BaseModel {
  name: string;
  discount: string;

  constructor(data: PromotionModel) {
    super(data.id || '');
    this.name = data.name;
    this.discount = data.discount;
  }
}