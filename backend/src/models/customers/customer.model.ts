import BaseModel from '../base.model';

export default class CustomerModel extends BaseModel {
  name: string;
  email: string;
  cpf: string;
  address: string;
  password: string;

  constructor(data: CustomerModel) {
    super(data.id || '');
    this.name = data.name;
    this.cpf = data.cpf;
    this.email = data.email;
    this.address = data.address;
    this.password = data.password;
  }
}