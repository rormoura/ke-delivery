import { loadFeature, defineFeature } from 'jest-cucumber';
import DeliverymanRepository from '../../../src/repositories/deliverymans/deliveryman.repository';
import supertest from 'supertest';
import app from '../../../src/app';
import { di } from '../../../src/di';

const feature = loadFeature('tests/features/deliverymans/Register.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    // mocking the repository
    let mockDeliverymanRepository:DeliverymanRepository;
    let response: supertest.Response;
  
    beforeEach(() => {
      mockDeliverymanRepository = di.getRepository<DeliverymanRepository>(DeliverymanRepository);
    });
    afterEach(async () => {
      (await mockDeliverymanRepository.getDeliverymans()).forEach(async delivery => {await mockDeliverymanRepository.deleteDeliveryman(delivery.name);})
    });
    //-------------------------------------------------------------------------------------------------------------------------------
    test('Obtenção de todos os entregadores', ({ given, when, then, and }) => {
      given(/^o sistema já possui o entregador com "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)" e o entregador com "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/, 
      async (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue, id2, idValue2, name2, nameValue2, email2, emailValue2, numOrders2, numOrdersValue2, numRates2, numRatesValue2) => {
        // Check if the deliveryman does not exist in the repository and delete it if it exists
        const existingDeliveryman = await mockDeliverymanRepository.getDeliveryman(idValue);
        if (!existingDeliveryman) {
          response = await request.post("/api/entregadores").send({
            id: idValue,
            name: nameValue, 
            email: emailValue
          });
        }
        const existingDeliveryman2 = await mockDeliverymanRepository.getDeliveryman(id2);
        if (!existingDeliveryman2) {
          response = await request.post("/api/entregadores").send({
            id: idValue2,
            name: nameValue2, 
            email: emailValue2
          });
        }
      });
  
      when(
        /^uma requisição GET for enviada para "(.*)"$/,
        async (url) => {
          response = await request.get(url);
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o campo "(.*)" do corpo da resposta deve estar preenchido com "(.*)"$/, (msgCode, msgCodeValue) => {
        expect(response.body.msgCode).toBe(msgCodeValue);
      });
  
      and(/^o JSON da resposta deve conter o entregador com o campo "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)" e o entregador com o campo "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/, 
        (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue, id2, idValue2, name2, nameValue2, email2, emailValue2, numOrders2, numOrdersValue2, numRates2, numRatesValue2) => {
          expect(response.body.data).toEqual([{"email": emailValue, "id": idValue, "name": nameValue, "numOrders": numOrdersValue, "numRates": numRatesValue}, {"email": emailValue2, "id": idValue2, "name": nameValue2, "numOrders": numOrdersValue2, "numRates": numRatesValue2}]);;
        }
      );
    });

    //-------------------------------------------------------------------------------------------------------------------------------
    test('Obtenção de um entregador por ID', ({ given, when, then, and }) => {
      given(/^o sistema já possui um entregador com "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/, 
      async (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue) => {
        // Check if the deliveryman does not exist in the repository and delete it if it exists
        const existingDeliveryman = await mockDeliverymanRepository.getDeliveryman(idValue);
        if (!existingDeliveryman) {
          response = await request.post("/api/entregadores").send({
            id: idValue,
            name: nameValue, 
            email: emailValue
          });
        }
      });
  
      when(
        /^uma requisição GET for enviada para "(.*)"$/,
        async (url) => {
          response = await request.get(url);
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o campo "(.*)" do corpo da resposta deve estar preenchido com "(.*)"$/, (msgCode, msgCodeValue) => {
        expect(response.body.msgCode).toBe(msgCodeValue);
      });
  
      and(/^o JSON da resposta deve conter um entregador com o campo "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/, 
        (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue) => {
          expect(response.body.data).toEqual(
            expect.objectContaining({
                id: idValue,
                name: nameValue, 
                email: emailValue,
                numOrders: numOrdersValue,
                numRates: numRatesValue
            })
          );
        }
      );
    });
    
    //-------------------------------------------------------------------------------------------------------------------------------
    test('Criação de um entregador bem sucedida', ({ given, when, then, and }) => {
      given(/^o sistema não tem um entregador com "(.*)" igual a "(.*)"$/, async (id, idValue) => {
        // Check if the deliveryman does not exist in the repository and delete it if it exists
        const existingDeliveryman = await mockDeliverymanRepository.getDeliveryman(idValue);
        if (existingDeliveryman) {
          await mockDeliverymanRepository.deleteDeliveryman;
        }
      });
  
      when(
        /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o campo "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/,
        async (url, id, idValue, name, nameValue, email, emailValue) => {
          response = await request.post(url).send({
            id: idValue,
            name: nameValue, 
            email: emailValue 
          });
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o campo "(.*)" do corpo da resposta deve estar preenchido com "(.*)"$/, (msgCode, msgCodeValue) => {
        expect(response.body.msgCode).toBe(msgCodeValue);
      });
  
      and(/^o JSON da resposta deve conter o campo "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/, 
        (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue) => {
          expect(response.body.data).toEqual(
            expect.objectContaining({
                id: idValue,
                name: nameValue, 
                email: emailValue,
                numOrders: numOrdersValue,
                numRates: numRatesValue
            })
          );
        }
      );
    });

    //-------------------------------------------------------------------------------------------------------------------------------
    test('Criação de um entregador já existente', ({ given, when, then, and }) => {
      given(/^o sistema já possui um entregador com "(.*)" igual a "(.*)"$/, async (id, idValue) => {
        // Check if the deliveryman does not exist in the repository and delete it if it exists
        const existingDeliveryman = await mockDeliverymanRepository.getDeliveryman(idValue);
        if (!existingDeliveryman) {
          response = await request.post("/api/entregadores").send({
            id: idValue,
            name: "Pessoa", 
            email: "pessoa@gmail.com" 
          });
        }
      });
  
      when(
        /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o campo "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/,
        async (url, id, idValue, name, nameValue, email, emailValue) => {
          response = await request.post(url).send({
            id: idValue,
            name: nameValue, 
            email: emailValue 
          });
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o campo "(.*)" do corpo da resposta deve estar preenchido com "(.*)"$/, (msgCode, msgCodeValue) => {
        expect(response.body.msgCode).toBe(msgCodeValue);
      });
  
      and(/^o JSON da resposta deve ser nulo$/, 
        (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue) => {
          expect(response.body.data).toEqual(
            expect.objectContaining({})
          );
        }
      );
    });

    //-------------------------------------------------------------------------------------------------------------------------------
    test('Atualização de um entregador bem sucedida', ({ given, when, then, and }) => {
      given(/^o sistema já possui o entregador com "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/, 
      async (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue) => {
        // Check if the deliveryman does not exist in the repository and delete it if it exists
        const existingDeliveryman = await mockDeliverymanRepository.getDeliveryman(idValue);
        if (!existingDeliveryman) {
          response = await request.post("/api/entregadores").send({
            id: idValue,
            name: nameValue, 
            email: emailValue 
          });
        }
      });
  
      when(
        /^uma requisição PUT for enviada para "(.*)" com o corpo da requisição sendo um JSON com o campo "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/,
        async (url, id, idValue, name, nameValue, email, emailValue) => {
          response = await request.put(url).send({
            id: idValue,
            name: nameValue, 
            email: emailValue 
          });
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o campo "(.*)" do corpo da resposta deve estar preenchido com "(.*)"$/, (msgCode, msgCodeValue) => {
        expect(response.body.msgCode).toBe(msgCodeValue);
      });
  
      and(/^o JSON da resposta deve conter o campo "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/, 
        (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue) => {
          expect(response.body.data).toEqual(
            expect.objectContaining({
                id: idValue,
                name: nameValue, 
                email: emailValue,
                numOrders: numOrdersValue,
                numRates: numRatesValue
            })
          );
        }
      );
    });

    //-------------------------------------------------------------------------------------------------------------------------------
    test('Atualização de um entregador não existente', ({ given, when, then, and }) => {
      given(/^o sistema não possui um entregador com "(.*)" igual a "(.*)"$/, async (id, idValue) => {
        // Check if the deliveryman does not exist in the repository and delete it if it exists
        const existingDeliveryman = await mockDeliverymanRepository.getDeliveryman(idValue);
        if (existingDeliveryman) {
          response = await request.delete("/api/entregadores/"+ idValue);
        }
      });
  
      when(
        /^uma requisição PUT for enviada para "(.*)"$/,
        async (url) => {
          response = await request.put(url).send({
          });
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o campo "(.*)" do corpo da resposta deve estar preenchido com "(.*)"$/, (msgCode, msgCodeValue) => {
        expect(response.body.msgCode).toBe(msgCodeValue);
      });
  
      and(/^o JSON da resposta deve ser nulo$/, 
        (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue) => {
          expect(response.body.data).toEqual(
            expect.objectContaining({})
          );
        }
      );
    });

    //-------------------------------------------------------------------------------------------------------------------------------
    test('Remoção de um entregador armazenado por ID', ({ given, when, then, and }) => {
      given(/^o sistema já possui o entregador com "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)", "(.*)" preenchido com "(.*)" e "(.*)" preenchido com "(.*)"$/, 
      async (id, idValue, name, nameValue, email, emailValue, numOrders, numOrdersValue, numRates, numRatesValue) => {
        // Check if the deliveryman does not exist in the repository and delete it if it exists
        const existingDeliveryman = await mockDeliverymanRepository.getDeliveryman(idValue);
        if (!existingDeliveryman) {
          response = await request.post("/api/entregadores").send({
            id: idValue,
            name: nameValue, 
            email: emailValue 
          });
        }
      });
  
      when(
        /^uma requisição DELETE for enviada para "(.*)"$/,
        async (url) => {
          response = await request.delete(url).send({
          });
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o campo "(.*)" do corpo da resposta deve estar preenchido com "(.*)"$/, (msgCode, msgCodeValue) => {
        expect(response.body.msgCode).toBe(msgCodeValue);
      });
  
    });

    //-------------------------------------------------------------------------------------------------------------------------------
    test('Remoção de um entregador não armazenado por ID', ({ given, when, then, and }) => {
      given(/^o sistema não possui um entregador com "(.*)" igual a "(.*)"$/, async (id, idValue) => {
        // Check if the deliveryman does not exist in the repository and delete it if it exists
        const existingDeliveryman = await mockDeliverymanRepository.getDeliveryman(idValue);
        if (existingDeliveryman) {
          response = await request.delete("/api/entregadores/"+ idValue);
        }
      });
  
      when(
        /^uma requisição DELETE for enviada para "(.*)"$/,
        async (url) => {
          response = await request.delete(url);
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o campo "(.*)" do corpo da resposta deve estar preenchido com "(.*)"$/, (msgCode, msgCodeValue) => {
        expect(response.body.msgCode).toBe(msgCodeValue);
      });
    });

  });