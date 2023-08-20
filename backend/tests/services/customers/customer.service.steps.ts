import { loadFeature, defineFeature } from 'jest-cucumber';
import CustomerRepository from '../../../src/repositories/customers/customer.repository';
import CustomerEntity from '../../../src/entities/customer/customer.entity';
import CustomerService from '../../../src/services/customers/customer.service';
import CustomerModel from '../../../src/models/customers/customer.model';
const feature = loadFeature('tests/features/payment/promotions-service.feature');

defineFeature(feature, (test) => {
    // mocking the repository
    let mockCustomerRepository: CustomerRepository;
    let service: CustomerService;
    let nameToCall: string;
    let entityToCall: CustomerEntity;
    let customerReturned: CustomerEntity;
    let customerReturnedArray: CustomerEntity[];
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

    test('Update customer name', ({ given, when, then }) => {
        given(
        /^o método updateCustomer chamado com "{id: "(.*)", name: "(.*)", email: "(.*)", cpf: "(.*)", address: "(.*)", password: "(.*)"}" do CustomerService retorna um cliente de id "(.*)", nome "(.*)", email "(.*)", cpf "(.*)", endereço "(.*)" e senha "(.*)"$/,
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
                    jest.spyOn(mockCustomerRepository, 'updateCustomer')
                        .mockResolvedValue(mockCustomerEntity);
            });

            when(/^o método updateCustomer é chamado para atualizar o nome do cliente "(.*)" para "(.*)"$/,
            async (customerName1, customerName2) => {
                customerReturned = await service.updateCustomer(customerName1, customerName2);});

            then(/^o cliente retornado deve ter id "(.*)", nome "(.*)", email "(.*)", cpf "(.*)", endereço "(.*)" e senha "(.*)"$/,
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
                expect(mockCustomerRepository.updateCustomer).toBeCalledWith(entityToCall)
            });});

//-------------------------------------------------------------------------------------------------------------------------------------
test('Create customer', ({ given, when, then }) => {
    given(
    /^o método createCustomer chamado com "{id: "(.*)", name: "(.*)", email: "(.*)", cpf: "(.*)", address: "(.*)", password: "(.*)"}" do CustomerService retorna um cliente de id "(.*)", nome "(.*)", email "(.*)", cpf "(.*)", endereço "(.*)" e senha "(.*)"$/,
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

        when(/^o método createCustomer é chamado para criar o cliente "(.*)"$/,
        async (customerName) => {
            customerReturned = await service.createCustomer(customerName);});

        then(/^o cliente retornado deve ter id "(.*)", nome "(.*)", email "(.*)", cpf "(.*)", endereço "(.*)" e senha "(.*)"$/,
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

//-------------------------------------------------------------------------------------------------------------------------------------
test('Return all customers', ({ given, when, then }) => {
    given(
    /^o método getCustomers chamado do CustomerService retorna um array de clientes de id "(.*)", nome "(.*)", email "(.*)", cpf "(.*)", endereço "(.*)" e senha "(.*)"$/,
            async (customerId, customerName, customerEmail, customerCpf, customerAddress, customerPassword) => {
                mockCustomerEntityArray = [new CustomerEntity({
                    id: customerId,
                    name: customerName,
                    email: customerEmail,
                    cpf: customerCpf,
                    address: customerAddress,
                    password: customerPassword
                })]
                jest.spyOn(mockCustomerRepository, 'getCustomers')
                    .mockResolvedValue(mockCustomerEntityArray);
        });

        when(/^o método getCustomers é chamado para retornar todos os clientes$/,
        async () => {
            customerReturnedArray = await service.getCustomers();});

        then(/^o array de clientes retornado deve ter id "(.*)", nome "(.*)", email "(.*)", cpf "(.*)", endereço "(.*)" e senha "(.*)"$/,
        (customerId, customerName, customerEmail, customerCpf, customerAddress, customerPassword) => {
            const customerModelArray = [new CustomerModel(new CustomerEntity({
                id: customerId,
                name: customerName,
                email: customerEmail,
                cpf: customerCpf,
                address: customerAddress,
                password: customerPassword
            }))]
            expect(customerReturnedArray).toEqual(customerModelArray);
            expect(mockCustomerRepository.getCustomers).toBeCalled()
        });});

//-------------------------------------------------------------------------------------------------------------------------------------
test('Delete customer', ({ given, when, then }) => {
    given(
    /^o método deleteCustomer chamado com "(.*)" do CustomerService não realiza retorno$/, 
            async (customerId) => {
                nameToCall = customerId;
                jest.spyOn(mockCustomerRepository, 'deleteCustomer')
                    .mockImplementation();
        });

        when(/^o método deleteCustomer é chamado para remover o cliente "(.*)"$/,
        async (customerId) => {
            voidReturned = await service.deleteCustomer(customerId);});

        then(/^nada deve ser retornado$/,
        () => {
            expect(voidReturned).toBeUndefined();
            expect(mockCustomerRepository.deleteCustomer).toBeCalledWith(nameToCall)
        });});

});
