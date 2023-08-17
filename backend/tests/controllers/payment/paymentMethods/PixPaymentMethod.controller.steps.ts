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
    given(/o sistema contém somente 1 método de pagamento: "(.*)"/,
    async (PaymentMethod) => {
      mockPixPaymentMethodEntity = await mockPixPaymentMethodRepository.createPixPaymentMethod(new PixPaymentMethodEntity({
        "id": "1",
        "name": PaymentMethod,
        "default": "no"
      }))
    });
    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com name="(.*)", default="(.*)"$/,
      async (url, name, Default) => {
        responsePOST = await request.post(url).send({
          "id": "2",
            "name": name,
            "default": Default
        });
      }
    );
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(responsePOST.status).toBe(parseInt(statusCode, 10));
  });
    and(/^o sistema contém somente 2 métodos de pagamento: "(.*)", "(.*)"$/,
    async (PaymentMethod1, PaymentMethod2) => {
      response = await request.get('/api/paymentMethods/');
      const existingPaymentMethods = response.body.data;
      expect(existingPaymentMethods.find((method: {name: string}) => method.name == PaymentMethod1)).toEqual(mockPixPaymentMethodEntity)
      expect(existingPaymentMethods.find((method: {name: string}) => method.name == PaymentMethod2)).toEqual(responsePOST.body.data)
      expect(existingPaymentMethods.length).toEqual(2);
});});});