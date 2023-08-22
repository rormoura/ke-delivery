import { loadFeature, defineFeature } from 'jest-cucumber';
import PixPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/PixPaymentMethod.repository';
import PixPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/PixPaymentMethod.entity';
import PixPaymentMethodService from '../../../../src/services/payment/paymentMethods/PixPaymentMethod.service';
import PixPaymentMethodModel from '../../../../src/models/payment/paymentMethods/PixPaymentMethod.model';
const feature = loadFeature('tests/features/payment/PixPaymentMethod-service.feature');
defineFeature(feature, (test) => {
    // mocking the repository
    let mockPixPaymentMethodRepository: PixPaymentMethodRepository;
    let service: PixPaymentMethodService;
    let nameToCall: string;
    let entityToCall: PixPaymentMethodEntity;
    let pixPaymentMethodReturned: PixPaymentMethodEntity;
    let paymentMethodsReturnedArray: PixPaymentMethodEntity[];
    let voidReturned: void;
    let mockPixPaymentMethodEntity: PixPaymentMethodEntity;
    let mockPixPaymentMethodEntityArray: PixPaymentMethodEntity[];

    beforeEach(() => {
        mockPixPaymentMethodRepository = {
            getPixPaymentMethods: jest.fn(),
            getPixPaymentMethod: jest.fn(),
            createPixPaymentMethod: jest.fn(),
            updatePixPaymentMethod: jest.fn(),
            deletePixPaymentMethod: jest.fn(),
        } as any;
        service = new PixPaymentMethodService(mockPixPaymentMethodRepository);
    });

    test('Update pix payment method name', ({ given, when, then }) => {
given(
/^o método updatePixPaymentMethod chamado com "(.*)" e "{id: "(.*)", name: "(.*)", default: "(.*)"}" do PixPaymentMethodService retorna um método de pagamento pix de id "(.*)", nome "(.*)" e default "(.*)"$/, 
            async (pixName1, pixId1, newPixName, pixDefault1, pixId, pixName2, pixDefault2) => {
                nameToCall = pixName1;
                entityToCall = new PixPaymentMethodEntity({
                    id: pixId1,
                    name: newPixName,
                    default: pixDefault1
                });
                mockPixPaymentMethodEntity = new PixPaymentMethodEntity({
                    id: pixId,
                    name: pixName2,
                    default: pixDefault2
                })
                jest.spyOn(mockPixPaymentMethodRepository, 'updatePixPaymentMethod')
                    .mockResolvedValue(mockPixPaymentMethodEntity);
        });

        when(/^o método updatePixPaymentMethod é chamado para atualizar o nome do método de pagamento "(.*)", de id "(.*)" e default "(.*)", para "(.*)"$/,
        async (oldPixName, pixId, pixDefault, newPixName) => {
            pixPaymentMethodReturned = await service.updatePixPaymentMethod(oldPixName, new PixPaymentMethodEntity({
                id: pixId,
                name: newPixName,
                default: pixDefault
            }));});

        then(/^o método de pagamento pix retornado deve ter id "(.*)", nome "(.*)" e default "(.*)"$/,
        (pixId, pixName, pixDefault) => {
            const pixPaymentMethodModel = new PixPaymentMethodModel(new PixPaymentMethodEntity({
                id: pixId,
                name: pixName,
                default: pixDefault
            }))
            expect(pixPaymentMethodReturned).toEqual(pixPaymentMethodModel);
            expect(mockPixPaymentMethodRepository.updatePixPaymentMethod).toBeCalledWith(nameToCall, entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Create pix payment method', ({ given, when, then }) => {
    given(
    /^o método createPixPaymentMethod chamado com "{id: "(.*)", name: "(.*)", default: "(.*)"}" do PixPaymentMethodService retorna um método de pagamento em dinheiro de id "(.*)", nome "(.*)" e default "(.*)"$/, 
            async (pixId1, pixName1, pixDefault1, pixId2, pixName2, pixDefault2) => {
                entityToCall = new PixPaymentMethodEntity({
                    id: pixId1,
                    name: pixName1,
                    default: pixDefault1
                });
                mockPixPaymentMethodEntity = new PixPaymentMethodEntity({
                    id: pixId2,
                    name: pixName2,
                    default: pixDefault2
                })
                jest.spyOn(mockPixPaymentMethodRepository, 'createPixPaymentMethod')
                    .mockResolvedValue(mockPixPaymentMethodEntity);
        });

        when(/^o método createPixPaymentMethod é chamado para criar o método de pagamento "(.*)", de id "(.*)" e default "(.*)"$/,
        async (pixName, pixId, pixDefault) => {
            pixPaymentMethodReturned = await service.createPixPaymentMethod(new PixPaymentMethodEntity({
                id: pixId,
                name: pixName,
                default: pixDefault
            }));});

        then(/^o método de pagamento pix retornado deve ter id "(.*)", nome "(.*)" e default "(.*)"$/,
        (pixId, pixName, pixDefault) => {
            const pixPaymentMethodModel = new PixPaymentMethodModel(new PixPaymentMethodEntity({
                id: pixId,
                name: pixName,
                default: pixDefault
            }))
            expect(pixPaymentMethodReturned).toEqual(pixPaymentMethodModel);
            expect(mockPixPaymentMethodRepository.createPixPaymentMethod).toBeCalledWith(entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Return all pix payment methods', ({ given, when, then }) => {
    given(
    /^o método getPixPaymentMethods do PixPaymentMethodService retorna um array com os métodos de pagamento "{id: "(.*)", name: "(.*)", default: "(.*)"}" e "{id: "(.*)", name: "(.*)", default: "(.*)"}"$/, 
            async (pixId1, pixName1, pixDefault1, pixId2, pixName2, pixDefault2) => {
                mockPixPaymentMethodEntityArray = [
                    new PixPaymentMethodEntity({
                        id: pixId1,
                        name: pixName1,
                        default: pixDefault1
                    }),
                    new PixPaymentMethodEntity({
                        id: pixId2,
                        name: pixName2,
                        default: pixDefault2
                    })]
                jest.spyOn(mockPixPaymentMethodRepository, 'getPixPaymentMethods')
                    .mockResolvedValue(mockPixPaymentMethodEntityArray);
        });

        when(/^o método getPixPaymentMethods é chamado$/,
        async () => {
            paymentMethodsReturnedArray = await service.getPixPaymentMethods();});

        then(/^o array retornado deve conter os métodos de pagamento "{id: "(.*)", name: "(.*)", default: "(.*)"}" e "{id: "(.*)", name: "(.*)", default: "(.*)"}"$/,
        (pixId1, pixName1, pixDefault1, pixId2, pixName2, pixDefault2) => {
            const pixPaymentMethodModelArray = [new PixPaymentMethodModel(new PixPaymentMethodEntity({
                id: pixId1,
                name: pixName1,
                default: pixDefault1
            })),
            new PixPaymentMethodModel(new PixPaymentMethodEntity({
                id: pixId2,
                name: pixName2,
                default: pixDefault2
            }))]
            expect(paymentMethodsReturnedArray).toEqual(pixPaymentMethodModelArray);
            expect(mockPixPaymentMethodRepository.getPixPaymentMethods).toBeCalledWith()
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Delete pix payment method', ({ given, when, then }) => {
    given(
    /^o método deletePixPaymentMethod chamado com "(.*)" do PixPaymentMethodService não realiza retorno$/, 
            async (pixName) => {
                nameToCall = pixName;
                jest.spyOn(mockPixPaymentMethodRepository, 'deletePixPaymentMethod')
                    .mockImplementation();
        });

        when(/^o método deletePixPaymentMethod é chamado para remover o método de pagamento "(.*)"$/,
        async (pixName) => {
            voidReturned = await service.deletePixPaymentMethod(pixName);});

        then(/^nada deve ser retornado$/,
        () => {
            expect(voidReturned).toBeUndefined();
            expect(mockPixPaymentMethodRepository.deletePixPaymentMethod).toBeCalledWith(nameToCall)
        });});
});