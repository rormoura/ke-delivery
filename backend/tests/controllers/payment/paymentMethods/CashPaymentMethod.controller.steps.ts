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
    given(/^a usuária "Maria" está armazenada no sistema$/, () => {});

    and(/o sistema contém somente 1 método de pagamento de "Maria": "(.*)"/, async (CashPaymentMethod) => {
      const newCashPaymentMethod = await mockCashRepository.createCashPaymentMethod(new CashPaymentMethodEntity({
        "id": "1",
        "name": CashPaymentMethod,
        "default": "no"
      }))
    });

    when(
      /^a usuária "Maria" remove o método de pagamento "(.*)"$/,
      async (PaymentMethod) => {
        response = await request.delete('/api/paymentMethods/cash/'+PaymentMethod+'/');
      }
    );

    then(/^a usuária "Maria" permanece armazenada no sistema$/, () => {});

    and(/^o sistema não contém métodos de pagamento de "Maria"$/, async () => {
      const response = await request.get('/api/paymentMethods/');
      const existingPaymentMethods = JSON.parse(response.text).data;
      expect(existingPaymentMethods).toEqual([])
});});});