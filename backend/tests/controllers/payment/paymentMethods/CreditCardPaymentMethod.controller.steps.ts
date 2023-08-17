import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../../src/app';
import { di } from '../../../../src/di';
import CreditCardPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import CreditCardPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/CreditCardPaymentMethod.entity';

const feature = loadFeature('tests/features/payment/PaymentMethods.feature', {
  tagFilter: '@runThisScenarioCreditCard'
});
const request = supertest(app);
defineFeature(feature, (test) => {
  // mocking the repository
  let mockCreditCardPaymentMethodRepository: CreditCardPaymentMethodRepository;
  let mockCreditCardPaymentMethodEntity: CreditCardPaymentMethodEntity;
  let responseGET: supertest.Response;
  let responsePUT: supertest.Response;
  beforeEach(() => {
    mockCreditCardPaymentMethodRepository = di.getRepository<CreditCardPaymentMethodRepository>(CreditCardPaymentMethodRepository);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Tentativa de atualização de método de pagamento (serviço)', ({ given, when, then, and }) => {
    given(/o sistema contém somente 1 método de pagamento: "(.*)", com cardNumber="(.*)", expirationDate="(.*)", cvv="(.*)", cardHolderName="(.*)"/,
    async (name, cardNumber, expirationDate, cvv, cardHolderName) => {
      mockCreditCardPaymentMethodEntity = await mockCreditCardPaymentMethodRepository.createCreditCardPaymentMethod(new CreditCardPaymentMethodEntity({
        "id": "1",
        "name": name,
        "cardHolderName": cardHolderName,
        "cardNumber": cardNumber,
        "cvv": cvv,
        "expirationDate": expirationDate,
        "default": "no"
      }))
    });
    when(
      /^uma requisição UPDATE for enviada para "(.*)" com o corpo da requisição sendo um JSON com name="(.*)", cardHolderName="(.*)", cardNumber="(.*)", expirationDate="(.*)", cvv="(.*)", default="(.*)"$/,
      async (url, name, cardHolderName, cardNumber, expirationDate, cvv, Default) => {
        responsePUT = await request.put(url).send({
            "name": name,
            "cardHolderName": cardHolderName,
            "cardNumber": cardNumber,
            "expirationDate": expirationDate,
            "cvv": cvv,
            "default": Default
        });
    });
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(responsePUT.status).toBe(parseInt(statusCode, 10));
  });
    and(/^o sistema contém somente 1 método de pagamento: "(.*)", com cardNumber="(.*)", expirationDate="(.*)", cvv="(.*)", cardHolderName="(.*)"$/,
    async (name, cardNumber, expirationDate, cvv, cardHolderName) => {
            responseGET = await request.get('/api/paymentMethods/');
            const existingPaymentMethods = responseGET.body.data;
            expect(existingPaymentMethods).toEqual([{
                "id": mockCreditCardPaymentMethodEntity.id,
                "name": name,
                "cardHolderName": cardHolderName,
                "cardNumber": cardNumber,
                "expirationDate": expirationDate,
                "cvv": cvv,
                "default": "no"
            }])
        });
});});