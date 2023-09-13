import CustomerEntity from '../../entities/customer/customer.entity';
import CustomerModel from '../../models/customers/customer.model';
import CustomerRepository from '../../repositories/customers/customer.repository';
import { HttpNotFoundError, HttpForbiddenError } from '../../utils/errors/http.error';

class CustomerServiceMessageCode {
  public static readonly Customer_not_found = 'Customer_not_found';
  public static readonly Customer_already_exists = 'Customer_already_exists'
}

class CustomerService {
  private CustomerRepository: CustomerRepository;

  constructor(
    CustomerRepository: CustomerRepository,
  ) {
    this.CustomerRepository = CustomerRepository;
  }

  public async getCustomers(): Promise<CustomerModel[]> {
    const CustomerEntity = await this.CustomerRepository.getCustomers();

    const customerModel = CustomerEntity.map((CustomerEntity) => new CustomerModel(CustomerEntity));

    return customerModel;
  } 
  
  public async getCustomer(id: string): Promise<CustomerModel> {
    const CustomerEntity = await this.CustomerRepository.getCustomer(id);

    if (!CustomerEntity) {
      throw new HttpNotFoundError({
        msg: 'Customer not found',
        msgCode: CustomerServiceMessageCode.Customer_not_found,
      });
    }

    const customerModel = new CustomerModel(CustomerEntity);

    return customerModel;
  }

  public async getCustomerbyEmail(email: string): Promise<CustomerModel> {
    const CustomerEntity = await this.CustomerRepository.getCustomerbyEmail(email);

    if (!CustomerEntity) {
      throw new HttpNotFoundError({
        msg: 'Customer not found',
        msgCode: CustomerServiceMessageCode.Customer_not_found,
      });
    }

    const customerModel = new CustomerModel(CustomerEntity);

    return customerModel;
  }

  public async getCustomerbyCpf(cpf: string): Promise<CustomerModel> {
    const CustomerEntity = await this.CustomerRepository.getCustomerbyCpf(cpf);

    if (!CustomerEntity) {
      throw new HttpNotFoundError({
        msg: 'Customer not found',
        msgCode: CustomerServiceMessageCode.Customer_not_found,
      });
    }

    const customerModel = new CustomerModel(CustomerEntity);

    return customerModel;
  }
  

  public async getCustomerWithoutError(email: string, cpf: string): Promise<CustomerEntity | null> {
    const CustomerEntity = await this.CustomerRepository.getCustomerbyEmail(email);
    const CustomerEntity2 = await this.CustomerRepository.getCustomerbyCpf(cpf);
    if (CustomerEntity) {
      return CustomerEntity;
    }
    if (CustomerEntity2) {
      return CustomerEntity2;
    }
    return null;
  }


  public async createCustomer(data: CustomerEntity): Promise<CustomerModel> {
    const CustomerEntityAlreadyExists = await this.getCustomerWithoutError(data.email, data.cpf)
    if (CustomerEntityAlreadyExists) {
      throw new HttpForbiddenError({
        msg: 'Customer already exists',
        msgCode: CustomerServiceMessageCode.Customer_already_exists,
      });
    }

    const CustomerEntity = await this.CustomerRepository.createCustomer(data);
    const customerModel = new CustomerModel(CustomerEntity);

    return customerModel;
  }

  public async updateCustomer(id: string, data: CustomerEntity): Promise<CustomerModel> {
    console.log("inicio", id);
    const CustomerEntity = await this.CustomerRepository.updateCustomer(id, data);
    console.log("inicio", CustomerEntity);
    if (!CustomerEntity) {
      throw new HttpNotFoundError({
        msg: 'Customer not found',
        msgCode: CustomerServiceMessageCode.Customer_not_found,
      });
    }

    const customerModel = new CustomerModel(CustomerEntity);
    console.log(customerModel);
    console.log(CustomerEntity);
    console.log("data", data);
    return customerModel;

  }

  public async deleteCustomer(id: string): Promise<void> {
    await this.CustomerRepository.deleteCustomer(id);
  }

  public async loginCustomer (email: string, password: string): Promise<CustomerModel> {
    const CustomerEntity = await this.CustomerRepository.getCustomerbyEmail(email);
    if (!CustomerEntity) {
      throw new HttpNotFoundError({
        msg: 'Customer not found',
        msgCode: CustomerServiceMessageCode.Customer_not_found,
      });
    }
    if (CustomerEntity.password !== password) {
      throw new HttpForbiddenError({
        msg: 'Password incorrect',
        msgCode: CustomerServiceMessageCode.Customer_not_found,
      });
    }
    const customerModel = new CustomerModel(CustomerEntity);
    return customerModel;
  }

}

export default CustomerService;