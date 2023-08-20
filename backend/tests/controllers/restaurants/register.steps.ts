import { loadFeature, defineFeature } from 'jest-cucumber';
import app from '../../../src/app';
import supertest from 'supertest';
import { di } from '../../../src/di';
import RegisterRestaurantRepository from '../../../src/repositories/restaurant.repository';
import RegisterRestaurantEntity from '../../../src/entities/restaurant.entity';

const feature = loadFeature('tests/features/restaurants/register-restaurants.feature');
const request = supertest(app);

defineFeature(feature, (registerRestaurant) => {
  let mockRegisterRestaurantRepository: RegisterRestaurantRepository;
  let mockRegisterRestaurantEntity: RegisterRestaurantEntity;
  let response: supertest.Response;
  
  beforeEach(() => {
    mockRegisterRestaurantRepository = di.getRepository<RegisterRestaurantRepository>(RegisterRestaurantRepository);
  });

  registerRestaurant('Create a account for restaurant', ({ given, when, then, and }) => {
    given(/^Eu estou na página "(.*)"$/, async (pageName) => {
      
    });
    when(/^preencho o campo tipo de negócio com "(.*)" $/, async(typeBusiness) => {
      
    });
    and(/^preencho o campo nome com "(.*)"$/, async(name) => {});
    and(/^preencho o campo email com "(.*)"$/, async(email) => {});
    and(/^preencho o campo contato com "(.*)"$/, async(phone) => {});
    and(/^preencho o campo senha com "(.*)"$/, async(password) => {});
    when(/^uma requisição POST for enviada "(.*)"$/, async(url) => {
      response = await request.post(url);
    });
    then(/^o status da resposta deve ser "(.*)"$/, async(statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });
  });
});