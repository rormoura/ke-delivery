import { loadFeature, defineFeature } from 'jest-cucumber';
import CreditCardPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import CreditCardPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import CreditCardPaymentMethodService from '../../../../src/services/payment/paymentMethods/CreditCardPaymentMethod.service';
import CreditCardPaymentMethodModel from '../../../../src/models/payment/paymentMethods/CreditCardPaymentMethod.model';
const feature = loadFeature('tests/features/payment/CreditCardPaymentMethod-service.feature');
defineFeature(feature, (test) => {
    // mocking the repository
    let mockCreditCardPaymentMethodRepository: CreditCardPaymentMethodRepository;
    let service: CreditCardPaymentMethodService;
    let nameToCall: string;
    let entityToCall: CreditCardPaymentMethodEntity;
    let creditCardPaymentMethodReturned: CreditCardPaymentMethodEntity;
    let paymentMethodsReturnedArray: CreditCardPaymentMethodEntity[];
    let voidReturned: void;
    let mockCreditCardPaymentMethodEntity: CreditCardPaymentMethodEntity;
    let mockCreditCardPaymentMethodEntityArray: CreditCardPaymentMethodEntity[];

    beforeEach(() => {
        mockCreditCardPaymentMethodRepository = {
            getCreditCardPaymentMethods: jest.fn(),
            getCreditCardPaymentMethod: jest.fn(),
            createCreditCardPaymentMethod: jest.fn(),
            updateCreditCardPaymentMethod: jest.fn(),
            deleteCreditCardPaymentMethod: jest.fn(),
        } as any;
        service = new CreditCardPaymentMethodService(mockCreditCardPaymentMethodRepository);
    });

    test('Update credit card payment method name', ({ given, when, then }) => {
given(/^o método updateCreditCardPaymentMethod chamado com "(.*)" e "{id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"}" do CreditCardPaymentMethodService retorna um cartão de crédito de id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"$/, 
            async (creditCardName1, creditCardId1, newCreditCardName, creditCardNumber1, creditCardHolderName1, creditCardCvv1, creditCardExpirationDate1, creditCardDefault1, creditCardId2, creditCardName2, creditCardNumber2, creditCardHolderName2, creditCardCvv2, creditCardExpirationDate2, creditCardDefault2) => {
                nameToCall = creditCardName1;
                entityToCall = new CreditCardPaymentMethodEntity({
                    id: creditCardId1,
                    name: newCreditCardName,
                    cardNumber: creditCardNumber1,
                    cardHolderName: creditCardHolderName1,
                    cvv: creditCardCvv1,
                    expirationDate: creditCardExpirationDate1,
                    default: creditCardDefault1
                });
                mockCreditCardPaymentMethodEntity = new CreditCardPaymentMethodEntity({
                    id: creditCardId2,
                    name: creditCardName2,
                    cardNumber: creditCardNumber2,
                    cardHolderName: creditCardHolderName2,
                    cvv: creditCardCvv2,
                    expirationDate: creditCardExpirationDate2,
                    default: creditCardDefault2
                });
                jest.spyOn(mockCreditCardPaymentMethodRepository, 'updateCreditCardPaymentMethod')
                    .mockResolvedValue(mockCreditCardPaymentMethodEntity);
        });

        when(/^o método updateCreditCardPaymentMethod é chamado para atualizar o nome do cartão de crédito "(.*)" de id: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)" para "(.*)"$/,
        async (oldCreditCardName, creditCardId, creditCardNumber, creditCardHolderName, creditCardCvv, creditCardExpirationDate,creditCardDefault, newCreditCardName) => {
            creditCardPaymentMethodReturned = await service.updateCreditCardPaymentMethod(oldCreditCardName, new CreditCardPaymentMethodEntity({
                id: creditCardId,
                name: newCreditCardName,
                cardNumber: creditCardNumber,
                cardHolderName: creditCardHolderName,
                cvv: creditCardCvv,
                expirationDate: creditCardExpirationDate,
                default: creditCardDefault
            }));});

        then(/^o cartão de crédito retornado deve ter id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"$/,
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
            expect(creditCardPaymentMethodReturned).toEqual(creditCardPaymentMethodModel);
            expect(mockCreditCardPaymentMethodRepository.updateCreditCardPaymentMethod).toBeCalledWith(nameToCall, entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Create credit card payment method', ({ given, when, then }) => {
    given(
    /^o método createCreditCardPaymentMethod chamado com "{id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"}" do CreditCardPaymentMethodService retorna um cartão de crédito de id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"$/, 
            async (creditCardId1, creditCardName1, creditCardNumber1, creditCardHolderName1, creditCardCvv1, creditCardExpirationDate1, creditCardDefault1, creditCardId2, creditCardName2, creditCardNumber2, creditCardHolderName2, creditCardCvv2, creditCardExpirationDate2, creditCardDefault2) => {
                entityToCall = new CreditCardPaymentMethodEntity({
                    id: creditCardId1,
                    name: creditCardName1,
                    cardNumber: creditCardNumber1,
                    cardHolderName: creditCardHolderName1,
                    cvv: creditCardCvv1,
                    expirationDate: creditCardExpirationDate1,
                    default: creditCardDefault1
                });
                mockCreditCardPaymentMethodEntity = new CreditCardPaymentMethodEntity({
                    id: creditCardId2,
                    name: creditCardName2,
                    cardNumber: creditCardNumber2,
                    cardHolderName: creditCardHolderName2,
                    cvv: creditCardCvv2,
                    expirationDate: creditCardExpirationDate2,
                    default: creditCardDefault2
                })
                jest.spyOn(mockCreditCardPaymentMethodRepository, 'createCreditCardPaymentMethod')
                    .mockResolvedValue(mockCreditCardPaymentMethodEntity);
        });

        when(/^o método createCreditCardPaymentMethod é chamado para criar o cartão de crédito "(.*)", de id "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default "(.*)"$/,
        async (creditCardName, creditCardId, creditCardNumber, creditCardHolderName, creditCardCvv, creditCardExpirationDate, creditCardDefault) => {
            creditCardPaymentMethodReturned = await service.createCreditCardPaymentMethod(new CreditCardPaymentMethodEntity({
                id: creditCardId,
                name: creditCardName,
                cardNumber: creditCardNumber,
                cardHolderName: creditCardHolderName,
                cvv: creditCardCvv,
                expirationDate: creditCardExpirationDate,
                default: creditCardDefault
            }));});

        then(/^o cartão de crédito retornado deve ter id "(.*)", nome "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default "(.*)"$/,
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
            expect(creditCardPaymentMethodReturned).toEqual(creditCardPaymentMethodModel);
            expect(mockCreditCardPaymentMethodRepository.createCreditCardPaymentMethod).toBeCalledWith(entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Return all credit card payment methods', ({ given, when, then }) => {
    given(
    /^o método getCreditCardPaymentMethods do CreditCardPaymentMethodService retorna um array com os cartões de crédito "{id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"}" e "{id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"}"$/, 
            async (creditCardId1, creditCardName1, creditCardNumber1, creditCardHolderName1, creditCardCvv1, creditCardExpirationDate1, creditCardDefault1, creditCardId2, creditCardName2, creditCardNumber2, creditCardHolderName2, creditCardCvv2, creditCardExpirationDate2, creditCardDefault2) => {
                mockCreditCardPaymentMethodEntityArray = [
                    new CreditCardPaymentMethodEntity({
                        id: creditCardId1,
                        name: creditCardName1,
                        cardNumber: creditCardNumber1,
                        cardHolderName: creditCardHolderName1,
                        cvv: creditCardCvv1,
                        expirationDate: creditCardExpirationDate1,
                        default: creditCardDefault1
                    }),
                    new CreditCardPaymentMethodEntity({
                        id: creditCardId2,
                        name: creditCardName2,
                        cardNumber: creditCardNumber2,
                        cardHolderName: creditCardHolderName2,
                        cvv: creditCardCvv2,
                        expirationDate: creditCardExpirationDate2,
                        default: creditCardDefault2
                    })]
                jest.spyOn(mockCreditCardPaymentMethodRepository, 'getCreditCardPaymentMethods')
                    .mockResolvedValue(mockCreditCardPaymentMethodEntityArray);
        });

        when(/^o método getCreditCardPaymentMethods é chamado$/,
        async () => {
            paymentMethodsReturnedArray = await service.getCreditCardPaymentMethods();});

        then(/^o array retornado deve conter os cartões de crédito "{id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"}" e "{id: "(.*)", name: "(.*)", cardNumber: "(.*)", cardHolderName: "(.*)", cvv: "(.*)", expirationDate: "(.*)", default: "(.*)"}"$/,
        (creditCardId1, creditCardName1, creditCardNumber1, creditCardHolderName1, creditCardCvv1, creditCardExpirationDate1, creditCardDefault1, creditCardId2, creditCardName2, creditCardNumber2, creditCardHolderName2, creditCardCvv2, creditCardExpirationDate2, creditCardDefault2) => {
            const creditCardPaymentMethodModelArray = [new CreditCardPaymentMethodModel(new CreditCardPaymentMethodEntity({
                id: creditCardId1,
                name: creditCardName1,
                cardNumber: creditCardNumber1,
                cardHolderName: creditCardHolderName1,
                cvv: creditCardCvv1,
                expirationDate: creditCardExpirationDate1,
                default: creditCardDefault1
            })),
            new CreditCardPaymentMethodModel(new CreditCardPaymentMethodEntity({
                id: creditCardId2,
                name: creditCardName2,
                cardNumber: creditCardNumber2,
                cardHolderName: creditCardHolderName2,
                cvv: creditCardCvv2,
                expirationDate: creditCardExpirationDate2,
                default: creditCardDefault2
            }))]
            expect(paymentMethodsReturnedArray).toEqual(creditCardPaymentMethodModelArray);
            expect(mockCreditCardPaymentMethodRepository.getCreditCardPaymentMethods).toBeCalledWith()
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Delete credit card payment method', ({ given, when, then }) => {
    given(
    /^o método deleteCreditCardPaymentMethod chamado com "(.*)" do CreditCardPaymentMethodService não realiza retorno$/, 
            async (creditCardName) => {
                nameToCall = creditCardName;
                jest.spyOn(mockCreditCardPaymentMethodRepository, 'deleteCreditCardPaymentMethod')
                    .mockImplementation();
        });

        when(/^o método deleteCreditCardPaymentMethod é chamado para remover o cartão de crédito "(.*)"$/,
        async (creditCardName) => {
            voidReturned = await service.deleteCreditCardPaymentMethod(creditCardName);});

        then(/^nada deve ser retornado$/,
        () => {
            expect(voidReturned).toBeUndefined();
            expect(mockCreditCardPaymentMethodRepository.deleteCreditCardPaymentMethod).toBeCalledWith(nameToCall)
        });});
});