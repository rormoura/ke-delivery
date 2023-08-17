import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../../src/app';
import { di } from '../../../../src/di';
import CashRepository from '../../../../src/repositories/payment/paymentMethods/CashPaymentMethod.repository';
import CashPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/CashPaymentMethod.entity';

const feature = loadFeature('tests/features/payment/PaymentMethods.feature', {
  tagFilter: '@runThisScenarioCash'
});
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockCashRepository: CashRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockCashRepository = di.getRepository<CashRepository>(CashRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Remoção de método de pagamento realizada com sucesso (serviço)', ({ given, when, then, and }) => {
    given(/o sistema contém somente 1 método de pagamento: "(.*)"/, async (CashPaymentMethod) => {
      const newCashPaymentMethod = await mockCashRepository.createCashPaymentMethod(new CashPaymentMethodEntity({
        "id": "1",
        "name": CashPaymentMethod,
        "default": "no"
      }))
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
    and(/^o sistema não contém métodos de pagamento$/, async () => {
      const response = await request.get('/api/paymentMethods/');
      const existingPaymentMethods = JSON.parse(response.text).data;
      expect(existingPaymentMethods).toEqual([])
});});});