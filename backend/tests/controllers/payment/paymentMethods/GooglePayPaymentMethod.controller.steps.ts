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
    given(/o sistema contém somente 1 método de pagamento: "(.*)"/,
    async (PaymentMethod) => {
      mockGooglePayPaymentMethodEntity = await mockGooglePayPaymentMethodRepository.createGooglePayPaymentMethod(new GooglePayPaymentMethodEntity({
        "id": "1",
        "name": PaymentMethod,
        "default": "no"
      }))
    });
    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com name="(.*)", cardHolderName="(.*)", cardNumber="(.*)", expirationDate="(.*)", cvv="(.*)", default="(.*)"$/,
      async (name, cardHolderName, cardNumber, expirationDate, cvv, Default) => {
        responsePOST = await request.post('/api/paymentMethods/creditCard/').send({
            "name": name,
            "cardHolderName": cardHolderName,
            "cardNumber": cardNumber,
            "expirationDate": expirationDate,
            "cvv": cvv,
            "default": Default
        });
    });
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(responsePOST.status).toBe(parseInt(statusCode, 10));
  });
    and(/^o sistema contém somente 1 método de pagamento: "(.*)"$/,
    async (PaymentMethod) => {
            expect(JSON.parse(responsePOST.text).msg).toBe("Credit Card payment method incomplete");
            responseGET = await request.get('/api/paymentMethods/');
            const existingPaymentMethods = responseGET.body.data;
            expect(existingPaymentMethods).toEqual([mockGooglePayPaymentMethodEntity])
        });
});});