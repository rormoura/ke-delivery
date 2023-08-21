import { loadFeature, defineFeature } from 'jest-cucumber';
import app from '../../../src/app';
import supertest from 'supertest';
import { di } from '../../../src/di';
import RestaurantRepository from '../../../src/repositories/restaurant.repository';
import RestaurantEntity from '../../../src/entities/restaurant.entity';

const feature = loadFeature('tests/features/restaurants/register-restaurants.feature', {tagFilter: "@testRegister"});
const request = supertest(app);

defineFeature(feature, (Restaurant) => {
  let mockRestaurantRepository: RestaurantRepository;
  let mockRestaurantEntity: RestaurantEntity;
  let response: supertest.Response;
  
  beforeEach(() => {
    mockRestaurantRepository = di.getRepository<RestaurantRepository>(RestaurantRepository);
  });
  afterEach(async () => {
    (await mockRestaurantRepository.getRestaurants()).forEach(async restaurant => { await mockRestaurantRepository.deleteRestaurant(restaurant.id); })
  })
  Restaurant('Create a account for restaurant', ({ given, when, then }) => {
    given(/^Restaurant apresenta um JSON com id = "(.*)", typeBusiness = "(.*)", responsibleName = "(.*)", responsibleCPF = "(.*)", email = "(.*)", phone = "(.*)", password = "(.*)", address = "(.*)", phoneRestaurant = "(.*)", corporateName = "(.*)", restaurantName = "(.*)", CNPJ = "(.*)", speciality = "(.*)"$/, 
    async (id, typeBusiness, responsibleName, responsibleCPF, email, phone, password, address, phoneRestaurant, corporateName, restaurantName, CNPJ, speciality) => {
      mockRestaurantEntity = await mockRestaurantRepository.createRestaurant(new RestaurantEntity({
        "id": id,
        "typeBusiness": typeBusiness,
        "responsibleName": responsibleName,
        "responsibleCPF": responsibleCPF,
        "email": email,
        "phone": phone,
        "password": password,
        "address": address,
        "phoneRestaurant": phoneRestaurant,
        "corporateName": corporateName,
        "restaurantName": restaurantName,
        "CNPJ": CNPJ,
        "specialty": speciality
      }));
    });
    when(/^Uma requisição "POST" for enviada para "restaurants" com id = "(.*)", typeBusiness = "(.*)", responsibleName = "(.*)", responsibleCPF = "(.*)", email = "(.*)", phone = "(.*)", password = "(.*)", address = "(.*)", phoneRestaurant = "(.*)", corporateName = "(.*)", restaurantName = "(.*)", CNPJ = "(.*)", speciality = "(.*)" $/, 
    async (id, typeBusiness, responsibleName, responsibleCPF, email, phone, password, address, phoneRestaurant, corporateName, restaurantName, CNPJ, speciality)  => {
      response = await request.post('/api/restaurants').send({
        "id": id,
        "typeBusiness": typeBusiness,
        "responsibleName": responsibleName,
        "responsibleCPF": responsibleCPF,
        "email": email,
        "phone": phone,
        "password": password,
        "address": address,
        "phoneRestaurant": phoneRestaurant,
        "corporateName": corporateName,
        "restaurantName": restaurantName,
        "CNPJ": CNPJ,
        "specialty": speciality
      })
    });

    then(/^o status da resposta deve ser "(.*)" e o JSON deve conter id = "(.*)", typeBusiness = "(.*)", responsibleName = "(.*)", responsibleCPF = "(.*)", email = "(.*)", phone = "(.*)", password = "(.*)", address = "(.*)", phoneRestaurant = "(.*)", corporateName = "(.*)", restaurantName = "(.*)", CNPJ = "(.*)", speciality = "(.*)"$/, 
    async (id, typeBusiness, responsibleName, responsibleCPF, email, phone, password, address, phoneRestaurant, corporateName, restaurantName, CNPJ, speciality, statusCode)  => {
      expect(response.status).toBe(parseInt(statusCode, 10));
      expect(response.body.data).toEqual(
        expect.objectContaining({
          "typeBusiness": typeBusiness,
        "responsibleName": responsibleName,
        "responsibleCPF": responsibleCPF,
        "email": email,
        "phone": phone,
        "password": password,
        "address": address,
        "phoneRestaurant": phoneRestaurant,
        "corporateName": corporateName,
        "restaurantName": restaurantName,
        "CNPJ": CNPJ,
        "specialty": speciality
        })
      );
    });
  });
});