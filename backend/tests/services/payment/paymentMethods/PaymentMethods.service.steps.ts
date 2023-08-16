import { loadFeature, defineFeature } from 'jest-cucumber';
import PixPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/PixPaymentMethod.repository';
import CashPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/CashPaymentMethod.repository';
import CreditCardPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import GooglePayPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import CreditCardPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import CreditCardPaymentMethodModel from '../../../../src/models/payment/paymentMethods/CreditCardPaymentMethod.model';

import PaymentMethodsService from '../../../../src/services/payment/paymentMethods/PaymentMethods.service';

const feature = loadFeature('tests/features/payment/PaymentMethods-service.feature');
defineFeature(feature, (test) => {
    // mocking the repository
    let mockPixPaymentMethodRepository: PixPaymentMethodRepository;
    let mockCashPaymentMethodRepository: CashPaymentMethodRepository;
    let mockCreditCardPaymentMethodRepository: CreditCardPaymentMethodRepository;
    let mockGooglePayPaymentMethodRepository: GooglePayPaymentMethodRepository;

    let service: PaymentMethodsService;
    let defaultPaymentMethodReturned: CreditCardPaymentMethodEntity;
    let mockCreditCardPaymentMethodEntity: CreditCardPaymentMethodEntity;

    beforeEach(() => {
        mockPixPaymentMethodRepository = {
            getPixPaymentMethods: jest.fn(),
            getPixPaymentMethod: jest.fn(),
            createPixPaymentMethod: jest.fn(),
            updatePixPaymentMethod: jest.fn(),
            deletePixPaymentMethod: jest.fn(),
        } as any;

        mockCashPaymentMethodRepository = {
            getCashPaymentMethods: jest.fn(),
            getCashPaymentMethod: jest.fn(),
            createCashPaymentMethod: jest.fn(),
            updateCashPaymentMethod: jest.fn(),
            deleteCashPaymentMethod: jest.fn(),
        } as any;

        mockCreditCardPaymentMethodRepository = {
            getCreditCardPaymentMethods: jest.fn(),
            getCreditCardPaymentMethod: jest.fn(),
            createCreditCardPaymentMethod: jest.fn(),
            updateCreditCardPaymentMethod: jest.fn(),
            deleteCreditCardPaymentMethod: jest.fn(),
        } as any;

        mockGooglePayPaymentMethodRepository = {
            getGooglePayPaymentMethods: jest.fn(),
            getGooglePayPaymentMethod: jest.fn(),
            createGooglePayPaymentMethod: jest.fn(),
            updateGooglePayPaymentMethod: jest.fn(),
            deleteGooglePayPaymentMethod: jest.fn(),
        } as any;

        service = new PaymentMethodsService(mockCashPaymentMethodRepository, mockCreditCardPaymentMethodRepository, mockPixPaymentMethodRepository, mockGooglePayPaymentMethodRepository);
    });
test('Return default payment method', ({ given, when, then }) => {
    given(
    /^o método getDefaultPaymentMethod do PaymentMethodsService retorna o método de pagamento "{id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"}"$/, 
            async (creditCardId, creditCardName, creditCardNumber, creditCardHolderName, creditCardCvv, creditCardExpirationDate, creditCardDefault) => {
                mockCreditCardPaymentMethodEntity = new CreditCardPaymentMethodEntity({
                    id: creditCardId,
                    name: creditCardName,
                    cardNumber: creditCardNumber,
                    cardHolderName: creditCardHolderName,
                    cvv: creditCardCvv,
                    expirationDate: creditCardExpirationDate,
                    default: creditCardDefault
                })

                mockCreditCardPaymentMethodEntity.default = "yes"

                jest.spyOn(mockPixPaymentMethodRepository, 'getPixPaymentMethods')
                    .mockResolvedValue([]);
                jest.spyOn(mockCashPaymentMethodRepository, 'getCashPaymentMethods')
                    .mockResolvedValue([]);
                jest.spyOn(mockCreditCardPaymentMethodRepository, 'getCreditCardPaymentMethods')
                    .mockResolvedValue([mockCreditCardPaymentMethodEntity]);
                jest.spyOn(mockGooglePayPaymentMethodRepository, 'getGooglePayPaymentMethods')
                    .mockResolvedValue([]);
        });

        when(/^o método getDefaultPaymentMethod é chamado$/,
        async () => {
            defaultPaymentMethodReturned = await service.getDefaultPaymentMethod();});

        then(/^o método de pagamento retornado deve ser "{id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"}"$/,
        (creditCardId, creditCardName, creditCardNumber, creditCardHolderName, creditCardCvv, creditCardExpirationDate, creditCardDefault) => {
            const creditCardPaymentMethodModel = new CreditCardPaymentMethodModel(new CreditCardPaymentMethodEntity({
                id: creditCardId,
                    name: creditCardName,
                    cardNumber: creditCardNumber,
                    cardHolderName: creditCardHolderName,
                    cvv: creditCardCvv,
                    expirationDate: creditCardExpirationDate,
                    default: creditCardDefault
            }))

            creditCardPaymentMethodModel.default = "yes"

            expect(defaultPaymentMethodReturned).toEqual(creditCardPaymentMethodModel);
            expect(mockPixPaymentMethodRepository.getPixPaymentMethods).toBeCalledWith();
            expect(mockCashPaymentMethodRepository.getCashPaymentMethods).toBeCalledWith();
            expect(mockCreditCardPaymentMethodRepository.getCreditCardPaymentMethods).toBeCalledWith();
            expect(mockGooglePayPaymentMethodRepository.getGooglePayPaymentMethods).toBeCalledWith();
        });});});