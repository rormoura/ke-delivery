import BaseModel from './base.model';

export default class RestaurantModel extends BaseModel {
  pageName: string;
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
  specialty: string;

  constructor(data: RestaurantModel) {
    super(data.id || '');  // PRIMARY GENERATED COLUMN
    this.pageName = data.pageName;
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
    this.specialty = data.specialty;
  }
}
