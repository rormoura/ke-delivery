import { loadFeature, defineFeature } from 'jest-cucumber';
import GooglePayPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import GooglePayPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import GooglePayPaymentMethodService from '../../../../src/services/payment/paymentMethods/GooglePayPaymentMethod.service';
import GooglePayPaymentMethodModel from '../../../../src/models/payment/paymentMethods/GooglePayPaymentMethod.model';
const feature = loadFeature('tests/features/payment/GooglePayPaymentMethod-service.feature');
defineFeature(feature, (test) => {
    // mocking the repository
    let mockGooglePayPaymentMethodRepository: GooglePayPaymentMethodRepository;
    let service: GooglePayPaymentMethodService;
    let nameToCall: string;
    let entityToCall: GooglePayPaymentMethodEntity;
    let googlePayPaymentMethodReturned: GooglePayPaymentMethodEntity;
    let paymentMethodsReturnedArray: GooglePayPaymentMethodEntity[];
    let voidReturned: void;
    let mockGooglePayPaymentMethodEntity: GooglePayPaymentMethodEntity;
    let mockGooglePayPaymentMethodEntityArray: GooglePayPaymentMethodEntity[];

    beforeEach(() => {
        mockGooglePayPaymentMethodRepository = {
            getGooglePayPaymentMethods: jest.fn(),
            getGooglePayPaymentMethod: jest.fn(),
            createGooglePayPaymentMethod: jest.fn(),
            updateGooglePayPaymentMethod: jest.fn(),
            deleteGooglePayPaymentMethod: jest.fn(),
        } as any;
        service = new GooglePayPaymentMethodService(mockGooglePayPaymentMethodRepository);
    });

    test('Update google pay payment method name', ({ given, when, then }) => {
given(
/^o método updateGooglePayPaymentMethod chamado com "(.*)" e "{id: "(.*)", name: "(.*)", default: "(.*)"}" do GooglePayPaymentMethodService retorna um método de pagamento google pay de id "(.*)", nome "(.*)" e default "(.*)"$/, 
            async (googlePayName1, googlePayId1, newGooglePayName, googlePayDefault1, googlePayId, googlePayName2, googlePayDefault2) => {
                nameToCall = googlePayName1;
                entityToCall = new GooglePayPaymentMethodEntity({
                    id: googlePayId1,
                    name: newGooglePayName,
                    default: googlePayDefault1
                });
                mockGooglePayPaymentMethodEntity = new GooglePayPaymentMethodEntity({
                    id: googlePayId,
                    name: googlePayName2,
                    default: googlePayDefault2
                })
                jest.spyOn(mockGooglePayPaymentMethodRepository, 'updateGooglePayPaymentMethod')
                    .mockResolvedValue(mockGooglePayPaymentMethodEntity);
        });

        when(/^o método updateGooglePayPaymentMethod é chamado para atualizar o nome do método de pagamento "(.*)", de id "(.*)" e default "(.*)", para "(.*)"$/,
        async (oldGooglePayName, googlePayId, googlePayDefault, newGooglePayName) => {
            googlePayPaymentMethodReturned = await service.updateGooglePayPaymentMethod(oldGooglePayName, new GooglePayPaymentMethodEntity({
                id: googlePayId,
                name: newGooglePayName,
                default: googlePayDefault
            }));});

        then(/^o método de pagamento google pay retornado deve ter id "(.*)", nome "(.*)" e default "(.*)"$/,
        (googlePayId, googlePayName, googlePayDefault) => {
            const googlePayPaymentMethodModel = new GooglePayPaymentMethodModel(new GooglePayPaymentMethodEntity({
                id: googlePayId,
                name: googlePayName,
                default: googlePayDefault
            }))
            expect(googlePayPaymentMethodReturned).toEqual(googlePayPaymentMethodModel);
            expect(mockGooglePayPaymentMethodRepository.updateGooglePayPaymentMethod).toBeCalledWith(nameToCall, entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Create google pay payment method', ({ given, when, then }) => {
    given(
    /^o método createGooglePayPaymentMethod chamado com "{id: "(.*)", name: "(.*)", default: "(.*)"}" do GooglePayPaymentMethodService retorna um método de pagamento em dinheiro de id "(.*)", nome "(.*)" e default "(.*)"$/, 
            async (googlePayId1, googlePayName1, googlePayDefault1, googlePayId2, googlePayName2, googlePayDefault2) => {
                entityToCall = new GooglePayPaymentMethodEntity({
                    id: googlePayId1,
                    name: googlePayName1,
                    default: googlePayDefault1
                });
                mockGooglePayPaymentMethodEntity = new GooglePayPaymentMethodEntity({
                    id: googlePayId2,
                    name: googlePayName2,
                    default: googlePayDefault2
                })
                jest.spyOn(mockGooglePayPaymentMethodRepository, 'createGooglePayPaymentMethod')
                    .mockResolvedValue(mockGooglePayPaymentMethodEntity);
        });

        when(/^o método createGooglePayPaymentMethod é chamado para criar o método de pagamento "(.*)", de id "(.*)" e default "(.*)"$/,
        async (googlePayName, googlePayId, googlePayDefault) => {
            googlePayPaymentMethodReturned = await service.createGooglePayPaymentMethod(new GooglePayPaymentMethodEntity({
                id: googlePayId,
                name: googlePayName,
                default: googlePayDefault
            }));});

        then(/^o método de pagamento google pay retornado deve ter id "(.*)", nome "(.*)" e default "(.*)"$/,
        (googlePayId, googlePayName, googlePayDefault) => {
            const googlePayPaymentMethodModel = new GooglePayPaymentMethodModel(new GooglePayPaymentMethodEntity({
                id: googlePayId,
                name: googlePayName,
                default: googlePayDefault
            }))
            expect(googlePayPaymentMethodReturned).toEqual(googlePayPaymentMethodModel);
            expect(mockGooglePayPaymentMethodRepository.createGooglePayPaymentMethod).toBeCalledWith(entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Return all google pay payment methods', ({ given, when, then }) => {
    given(
    /^o método getGooglePayPaymentMethods do GooglePayPaymentMethodService retorna um array com os métodos de pagamento "{id: "(.*)", name: "(.*)", default: "(.*)"}" e "{id: "(.*)", name: "(.*)", default: "(.*)"}"$/, 
            async (googlePayId1, googlePayName1, googlePayDefault1, googlePayId2, googlePayName2, googlePayDefault2) => {
                mockGooglePayPaymentMethodEntityArray = [
                    new GooglePayPaymentMethodEntity({
                        id: googlePayId1,
                        name: googlePayName1,
                        default: googlePayDefault1
                    }),
                    new GooglePayPaymentMethodEntity({
                        id: googlePayId2,
                        name: googlePayName2,
                        default: googlePayDefault2
                    })]
                jest.spyOn(mockGooglePayPaymentMethodRepository, 'getGooglePayPaymentMethods')
                    .mockResolvedValue(mockGooglePayPaymentMethodEntityArray);
        });

        when(/^o método getGooglePayPaymentMethods é chamado$/,
        async () => {
            paymentMethodsReturnedArray = await service.getGooglePayPaymentMethods();});

        then(/^o array retornado deve conter os métodos de pagamento "{id: "(.*)", name: "(.*)", default: "(.*)"}" e "{id: "(.*)", name: "(.*)", default: "(.*)"}"$/,
        (googlePayId1, googlePayName1, googlePayDefault1, googlePayId2, googlePayName2, googlePayDefault2) => {
            const googlePayPaymentMethodModelArray = [new GooglePayPaymentMethodModel(new GooglePayPaymentMethodEntity({
                id: googlePayId1,
                name: googlePayName1,
                default: googlePayDefault1
            })),
            new GooglePayPaymentMethodModel(new GooglePayPaymentMethodEntity({
                id: googlePayId2,
                name: googlePayName2,
                default: googlePayDefault2
            }))]
            expect(paymentMethodsReturnedArray).toEqual(googlePayPaymentMethodModelArray);
            expect(mockGooglePayPaymentMethodRepository.getGooglePayPaymentMethods).toBeCalledWith()
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Delete google pay payment method', ({ given, when, then }) => {
    given(
    /^o método deleteGooglePayPaymentMethod chamado com "(.*)" do GooglePayPaymentMethodService não realiza retorno$/, 
            async (googlePayName) => {
                nameToCall = googlePayName;
                jest.spyOn(mockGooglePayPaymentMethodRepository, 'deleteGooglePayPaymentMethod')
                    .mockImplementation();
        });

        when(/^o método deleteGooglePayPaymentMethod é chamado para remover o método de pagamento "(.*)"$/,
        async (googlePayName) => {
            voidReturned = await service.deleteGooglePayPaymentMethod(googlePayName);});

        then(/^nada deve ser retornado$/,
        () => {
            expect(voidReturned).toBeUndefined();
            expect(mockGooglePayPaymentMethodRepository.deleteGooglePayPaymentMethod).toBeCalledWith(nameToCall)
        });});
});