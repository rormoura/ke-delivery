import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../../src/app';
import { di } from '../../../../src/di';
import GooglePayPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import GooglePayPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import CreditCardPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import CreditCardPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/CreditCardPaymentMethod.entity';

const feature = loadFeature('tests/features/payment/PaymentMethods.feature', {
  tagFilter: '@runThisScenarioPaymentMethods'
});
const request = supertest(app);
defineFeature(feature, (test) => {
  // mocking the repository
  let mockCreditCardPaymentMethodRepository: CreditCardPaymentMethodRepository;
  let mockGooglePayPaymentMethodRepository: GooglePayPaymentMethodRepository;
  let mockCreditCardPaymentMethodEntity: CreditCardPaymentMethodEntity;
  let mockGooglePayPaymentMethodEntity: GooglePayPaymentMethodEntity;
  let response: supertest.Response;
  beforeEach(() => {
    mockGooglePayPaymentMethodRepository = di.getRepository<GooglePayPaymentMethodRepository>(GooglePayPaymentMethodRepository);
    mockCreditCardPaymentMethodRepository = di.getRepository<CreditCardPaymentMethodRepository>(CreditCardPaymentMethodRepository);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Modificação do método de pagamento padrão realizada com sucesso (serviço)', ({ given, when, then, and }) => {
    given(/o sistema contém somente 2 métodos de pagamento: "(.*)", "(.*)", este último é o método de pagamento padrão/,
    async (PaymentMethod1, PaymentMethod2) => {
      mockGooglePayPaymentMethodEntity = await mockGooglePayPaymentMethodRepository.createGooglePayPaymentMethod(new GooglePayPaymentMethodEntity({
        "id": "1",
        "name": PaymentMethod2,
        "default": "no"
      }))
      mockCreditCardPaymentMethodEntity = await mockCreditCardPaymentMethodRepository.createCreditCardPaymentMethod(new CreditCardPaymentMethodEntity({
        "id": "2",
        "name": PaymentMethod1,
        "cardNumber": "5577",
        "cardHolderName": "MARIA DA SILVA",
        "expirationDate": "31/02/2026",
        "cvv": "121",
        "default": "no"
      }))
      await request.put('/api/paymentMethods/default'+PaymentMethod2);
    });
    when(
      /^uma requisição PUT for enviada para "(.*)"$/,
      async (url) => {
        response = await request.put(url);
      }
    );
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
  });
    and(/^o sistema contém somente 2 métodos de pagamento: "(.*)", "(.*)", este último é o método de pagamento padrão$/,
    async (PaymentMethod1, PaymentMethod2) => {
      mockCreditCardPaymentMethodEntity.default = "yes";
      response = await request.get('/api/paymentMethods/');
      const existingPaymentMethods = response.body.data;
      expect(existingPaymentMethods.find((method: {name: string}) => method.name == PaymentMethod2)).toEqual(mockCreditCardPaymentMethodEntity)
      expect(existingPaymentMethods.find((method: {name: string}) => method.name == PaymentMethod1)).toEqual(mockGooglePayPaymentMethodEntity)
});});});