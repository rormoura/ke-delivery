import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../../src/app';
import { di } from '../../../../src/di';
import PixPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/PixPaymentMethod.repository';
import PixPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/PixPaymentMethod.entity';

const feature = loadFeature('tests/features/payment/PaymentMethods.feature', {
  tagFilter: '@runThisScenarioPix'
});
const request = supertest(app);
defineFeature(feature, (test) => {
  // mocking the repository
  let mockPixPaymentMethodRepository: PixPaymentMethodRepository;
  let mockPixPaymentMethodEntity: PixPaymentMethodEntity;
  let responsePOST: any;
  let response: supertest.Response;
  beforeEach(() => {
    mockPixPaymentMethodRepository = di.getRepository<PixPaymentMethodRepository>(PixPaymentMethodRepository);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Adição do método de pagamento realizada com sucesso (serviço)', ({ given, when, then, and }) => {
    given(/^a usuária "Maria" está armazenada no sistema$/, () => {});
    and(/o sistema contém somente 1 método de pagamento de "Maria": "(.*)"/,
    async (PaymentMethod) => {
      mockPixPaymentMethodEntity = await mockPixPaymentMethodRepository.createPixPaymentMethod(new PixPaymentMethodEntity({
        "id": "1",
        "name": PaymentMethod,
        "default": "no"
      }))
    });
    when(
      /^a usuária "Maria" adiciona o método de pagamento "(.*)"$/,
      async (PaymentMethod) => {
        responsePOST = await request.post('/api/paymentMethods/googlePay/').send({
          "id": "2",
            "name": PaymentMethod,
            "default": "no"
        });
      }
    );
    then(/^a usuária "Maria" permanece armazenada no sistema$/, () => {});
    and(/^o sistema contém somente 2 métodos de pagamento de "Maria": "(.*)", "(.*)"$/,
    async (PaymentMethod1, PaymentMethod2) => {
      response = await request.get('/api/paymentMethods/');
      const existingPaymentMethods = response.body.data;
      expect(response.status).toBe(200)
      expect(existingPaymentMethods.find((method: {name: string}) => method.name == PaymentMethod1)).toEqual(mockPixPaymentMethodEntity)
      expect(existingPaymentMethods.find((method: {name: string}) => method.name == PaymentMethod2)).toEqual(responsePOST.body.data)
      expect(existingPaymentMethods.length).toEqual(2);
});});});