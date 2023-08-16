import BaseEntity from '../../base.entity';

export default class PixPaymentMethodEntity extends BaseEntity {
  name: string;
  default: string;

  constructor(data: PixPaymentMethodEntity, isDefault?: string) {
    super(data.id || '');
    this.name = data.name;
    if(isDefault){
      this.default = isDefault;
    }
    else{
      if(data.default == "yes"){
        this.default = "yes"
      }
      else{
        this.default = "no"
      }
    }
  }
}