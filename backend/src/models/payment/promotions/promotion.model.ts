import BaseModel from '../../base.model';

export default class PromotionModel extends BaseModel {
  name: string;

  constructor(data: PromotionModel) {
    super(data.id || '');
    this.name = data.name;
  }
}