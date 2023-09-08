/* eslint-disable no-unused-expressions */
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../src/app';
import { di } from '../../../src/di';
import CustomerRepository from '../../../src/repositories/customers/customer.repository';
import CustomerEntity from '../../../src/entities/customer/customer.entity';

const feature = loadFeature('tests/features/customers/CadastroManutencaoDeClientes.feature', {tagFilter: "@runThis" });
const request = supertest(app);
defineFeature(feature, (test) => {
  // mocking the repository
  let mockCustomerRepository: CustomerRepository;
  let mockCustomerEntity: CustomerEntity;
  let response: supertest.Response;
  beforeEach(() => {
    mockCustomerRepository = di.getRepository<CustomerRepository>(CustomerRepository);
  });
  afterEach(async () => {
    (await mockCustomerRepository.getCustomers()).forEach(async customer => { await mockCustomerRepository.deleteCustomer(customer.id); })
  })
  test('Cadastrar cliente', ({ given, when, then, and }) => {
    given(/^O sistema contém um costumer com JSON contendo id = "(.*)", name = "(.*)", email = "(.*)", cpf = "(.*)", address = "(.*)" e password = "(.*)"/,
    async (id, name, email, cpf, address, password) => {
        mockCustomerEntity = await mockCustomerRepository.createCustomer(new CustomerEntity({
            "id": id,
            "name": name,
            "email": email,
            "cpf": cpf,
            "address": address,
            "password": password,
          }));
      });
    when(/^uma requisição "POST" for enviada para "customers" com o corpo da requisição contendo id = "(.*)", name = "(.*)", email = "(.*)", cpf = "(.*)", address = "(.*)" e password = "(.*)"/,
        async (id, name, email, cpf, address, password) => {
          response = await request.post('/api/customers').send({
            "id": id,
            "name": name,
            "email": email,
            "cpf": cpf,
            "address": address,
            "password": password,
          });
  });
    then(/^o status da resposta deve ser "(.*)" e o JSON da resposta deve conter o id = "(.*)", name = "(.*)", email = "(.*)", cpf = "(.*)", address = "(.*)" e password = "(.*)"/,
    async (resp, id, name, email, cpf, address, password) => {
      expect(response.status).toBe(parseInt(resp, 10))
      expect(response.body.data).toEqual(
        expect.objectContaining({
            "name": name,
            "email": email,
            "cpf": cpf,
            "address": address,
            "password": password
        })
      );
    })              
  });});