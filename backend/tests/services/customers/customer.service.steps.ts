import { loadFeature, defineFeature } from 'jest-cucumber';
import CustomerRepository from '../../../src/repositories/customers/customer.repository';
import CustomerEntity from '../../../src/entities/customer/customer.entity';
import CustomerService from '../../../src/services/customers/customer.service';
import CustomerModel from '../../../src/models/customers/customer.model';
const feature = loadFeature('tests/features/customers/CadastroManutencaoDeClientes-service.feature');

defineFeature(feature, (test) => {

    // mocking the repository
    let mockCustomerRepository: CustomerRepository;
    let service: CustomerService;
    let nameToCall: string;
    let entityToCall: CustomerEntity;
    let customerReturned: CustomerEntity;
    let customersReturnedArray: CustomerEntity[];
    let voidReturned: void;
    let mockCustomerEntity: CustomerEntity;
    let mockCustomerEntityArray: CustomerEntity[];

    beforeEach(() => {
        mockCustomerRepository = {
            getCustomers: jest.fn(),
            getCustomer: jest.fn(),
            createCustomer: jest.fn(),
            updateCustomer: jest.fn(),
            deleteCustomer: jest.fn(),
        } as any;
        service = new CustomerService(mockCustomerRepository);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Create customer', ({ given, when, then }) => {
        given(
        /^o método createCustomer chamado com id: "(.*)", name: "(.*)", email: "(.*)", cpf: "(.*)",address: "(.*)", password: "(.*)" do CustomerService retorna um Customer com id "(.*)", name "(.*)", email "(.*)", cpf "(.*)", address "(.*)" e password "(.*)"$/, 
                async (customerId1, customerName1, customerEmail1, customerCpf1, customerAddress1, customerPassword1, customerId2, customerName2, customerEmail2, customerCpf2, customerAddress2, customerPassword2) => {
                    entityToCall = new CustomerEntity({
                        id: customerId1,
                        name: customerName1,
                        email: customerEmail1,
                        cpf: customerCpf1,
                        address: customerAddress1,
                        password: customerPassword1
                    });
                    mockCustomerEntity = new CustomerEntity({
                        id: customerId2,
                        name: customerName2,
                        email: customerEmail2,
                        cpf: customerCpf2,
                        address: customerAddress2,
                        password: customerPassword2
                    })
                    jest.spyOn(mockCustomerRepository, 'createCustomer')
                        .mockResolvedValue(mockCustomerEntity);
            });

            when(/^o método createCustomer é chamado para criar o customer com id "(.*)", name "(.*)", email "(.*)", cpf "(.*)", address "(.*)" e password "(.*)"$/,
            async (customerId, customerName, customerEmail, customerCpf, customerAddress, customerPassword) => {
                customerReturned = await service.createCustomer(new CustomerEntity({
                    id: customerId,
                    name: customerName,
                    email: customerEmail,
                    cpf: customerCpf,
                    address: customerAddress,
                    password: customerPassword
                }));});

            then(/^o customer retornado deve ter id "(.*)", name "(.*)", email "(.*)", cpf "(.*)", address "(.*)" e password "(.*)"$/,
            (customerId, customerName, customerEmail, customerCpf, customerAddress, customerPassword) => {
                const customerModel = new CustomerModel(new CustomerEntity({
                    id: customerId,
                    name: customerName,
                    email: customerEmail,
                    cpf: customerCpf,
                    address: customerAddress,
                    password: customerPassword
                }))
                expect(customerReturned).toEqual(customerModel);
                expect(mockCustomerRepository.createCustomer).toBeCalledWith(entityToCall)
            });});

        test('Delete customer', ({ given, when, then }) => {
            given(
            /^o método deleteCustomer chamado com "(.*)" do CustomerService não realiza retorno$/, 
                    async (customerName) => {
                        nameToCall = customerName;
                        jest.spyOn(mockCustomerRepository, 'deleteCustomer')
                            .mockImplementation();
                });
    
                when(/^o método deleteCustomer é chamado para deletar o customer com id "(.*)"$/,
                async (customerId) => {
                    voidReturned = await service.deleteCustomer(customerId);});
    
                then(/^o customer com id "(.*)" não deve existir$/,
                (customerId) => {
                    expect(voidReturned).toBeUndefined();
                    expect(mockCustomerRepository.deleteCustomer).toBeCalledWith(nameToCall)
                });});

        });


