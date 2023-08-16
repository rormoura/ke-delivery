import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../../src/app';
import { di } from '../../../../src/di';
import GooglePayPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import GooglePayPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/GooglePayPaymentMethod.entity';

const feature = loadFeature('tests/features/payment/PaymentMethods.feature', {
  tagFilter: '@runThisScenarioGooglePay'
});
const request = supertest(app);
defineFeature(feature, (test) => {
  // mocking the repository
  let mockGooglePayPaymentMethodRepository: GooglePayPaymentMethodRepository;
  let mockGooglePayPaymentMethodEntity: GooglePayPaymentMethodEntity;
  let responseGET: supertest.Response;
  let responsePOST: supertest.Response;
  beforeEach(() => {
    mockGooglePayPaymentMethodRepository = di.getRepository<GooglePayPaymentMethodRepository>(GooglePayPaymentMethodRepository);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Tentativa de adição de método de pagamento com informações incompletas (serviço)', ({ given, when, then, and }) => {
    given(/^a usuária "Maria" está armazenada no sistema$/, () => {});
    and(/o sistema contém somente 1 método de pagamento de "Maria": "(.*)"/,
    async (PaymentMethod) => {
      mockGooglePayPaymentMethodEntity = await mockGooglePayPaymentMethodRepository.createGooglePayPaymentMethod(new GooglePayPaymentMethodEntity({
        "id": "1",
        "name": PaymentMethod,
        "default": "no"
      }))
    });
    when(
      /^a usuária "Maria" adiciona o método de pagamento "(.*)" de maneira incompleta$/,
      async (PaymentMethod) => {
        responsePOST = await request.post('/api/paymentMethods/creditCard/').send({
            "id": "2",
            "name": PaymentMethod,
            "cardHolderName": "MARIA SILVA",
            "cardNumber": "",
            "expirationDate": "30/05/2032",
            "cvv": "101",
            "default": "no"
        });
    });
    then(/^a usuária "Maria" permanece armazenada no sistema$/, () => {});
    and(/^o sistema contém somente 1 método de pagamento de "Maria": "(.*)"$/,
    async (PaymentMethod) => {
            expect(JSON.parse(responsePOST.text).msg).toBe("Credit Card payment method incomplete");
            responseGET = await request.get('/api/paymentMethods/');
            const existingPaymentMethods = responseGET.body.data;
            expect(responseGET.status).toBe(200)
            expect(existingPaymentMethods).toEqual([mockGooglePayPaymentMethodEntity])
        });
});});