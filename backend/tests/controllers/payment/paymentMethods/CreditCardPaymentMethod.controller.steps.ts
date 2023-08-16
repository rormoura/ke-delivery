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
    given(/^a usuária "Maria" está armazenada no sistema$/, () => {});
    and(/o sistema contém somente 1 método de pagamento de "Maria": "(.*)", com "número do cartão"="(.*)", "validade"="(.*)", "CVV"="(.*)", "nome do titular"="(.*)"/,
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
      /^a usuária "Maria" atualiza o método de pagamento "(.*)" de maneira incompleta$/,
      async (name) => {
        responsePUT = await request.put('/api/paymentMethods/creditCard/'+name).send({
            "id": mockCreditCardPaymentMethodEntity.id,
            "name": name,
            "cardHolderName": mockCreditCardPaymentMethodEntity.cardHolderName,
            "cardNumber": mockCreditCardPaymentMethodEntity.cardNumber,
            "expirationDate": mockCreditCardPaymentMethodEntity.expirationDate,
            "cvv": "",
            "default": "no"
        });
    });
    then(/^a usuária "Maria" permanece armazenada no sistema$/, () => {});
    and(/^o sistema contém somente 1 método de pagamento de "Maria": "(.*)", com "número do cartão"="(.*)", "validade"="(.*)", "CVV"="(.*)", "nome do titular"="(.*)"$/,
    async (name, cardNumber, expirationDate, cvv, cardHolderName) => {
            expect(JSON.parse(responsePUT.text).msg).toBe("Credit Card payment method incomplete");
            responseGET = await request.get('/api/paymentMethods/');
            const existingPaymentMethods = responseGET.body.data;
            expect(responseGET.status).toBe(200)
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