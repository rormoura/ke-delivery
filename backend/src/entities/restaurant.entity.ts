import BaseEntity from './base.entity';

export default class RestaurantEntity extends BaseEntity {
  typeBusiness: string;
  responsibleName: string;
  responsibleCPF: string;
  email: string;
  phone: string;
  password: string;
  address:string;
  phoneRestaurant: string;
  corporateName: string;
  restaurantName: string;
  CNPJ: string;
  speciality: string;

  constructor(data: RestaurantEntity) {
    super(data.id || '');  // PRIMARY GENERATED COLUMN
    this.typeBusiness = data.typeBusiness;
    this.responsibleName = data.responsibleName;
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    this.address = data.address;
    this.phoneRestaurant = data.phoneRestaurant;
    this.corporateName = data.corporateName;
    this.restaurantName = data.restaurantName;
    this.CNPJ = data.CNPJ;
    this.speciality = data.speciality;
  }
}
