import BaseEntity from "../base.entity";

export default class CustomerEntity extends BaseEntity {
  name: string;
  email: string;
  cpf: string;
  address: string;
  password: string;



  constructor(data: CustomerEntity) {
    super(data.id || '');
    this.name = data.name;
    this.cpf = data.cpf;
    this.email = data.email;
    this.address = data.address;
    this.password = data.password;
    
  }
}