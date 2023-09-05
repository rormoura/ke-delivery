import BaseEntity from '../../base.entity';

export default class PromotionEntity extends BaseEntity {
    name: string;
    discount: string;
  
    constructor(data: PromotionEntity) {
      super(data.id || '');
      this.name = data.name;
      this.discount = data.discount;
    }
  }