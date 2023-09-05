import { loadFeature, defineFeature } from 'jest-cucumber';
import CashPaymentMethodRepository from '../../../../src/repositories/payment/paymentMethods/CashPaymentMethod.repository';
import CashPaymentMethodEntity from '../../../../src/entities/payment/paymentMethods/CashPaymentMethod.entity';
import CashPaymentMethodService from '../../../../src/services/payment/paymentMethods/CashPaymentMethod.service';
import CashPaymentMethodModel from '../../../../src/models/payment/paymentMethods/CashPaymentMethod.model';
const feature = loadFeature('tests/features/payment/CashPaymentMethod-service.feature');
defineFeature(feature, (test) => {
    // mocking the repository
    let mockCashPaymentMethodRepository: CashPaymentMethodRepository;
    let service: CashPaymentMethodService;
    let nameToCall: string;
    let entityToCall: CashPaymentMethodEntity;
    let cashPaymentMethodReturned: CashPaymentMethodEntity;
    let paymentMethodsReturnedArray: CashPaymentMethodEntity[];
    let voidReturned: void;
    let mockCashPaymentMethodEntity: CashPaymentMethodEntity;
    let mockCashPaymentMethodEntityArray: CashPaymentMethodEntity[];

    beforeEach(() => {
        mockCashPaymentMethodRepository = {
            getCashPaymentMethods: jest.fn(),
            getCashPaymentMethod: jest.fn(),
            createCashPaymentMethod: jest.fn(),
            updateCashPaymentMethod: jest.fn(),
            deleteCashPaymentMethod: jest.fn(),
        } as any;
        service = new CashPaymentMethodService(mockCashPaymentMethodRepository);
    });

    test('Update cash payment method name', ({ given, when, then }) => {
given(
/^o método updateCashPaymentMethod chamado com "(.*)" e "{id: "(.*)", name: "(.*)", default: "(.*)"}" do CashPaymentMethodService retorna um método de pagamento em dinheiro de id "(.*)", nome "(.*)" e default "(.*)"$/, 
            async (cashName1, cashId1, newCashName, cashDefault1, cashId, cashName2, cashDefault2) => {
                nameToCall = cashName1;
                entityToCall = new CashPaymentMethodEntity({
                    id: cashId1,
                    name: newCashName,
                    default: cashDefault1
                });
                mockCashPaymentMethodEntity = new CashPaymentMethodEntity({
                    id: cashId,
                    name: cashName2,
                    default: cashDefault2
                })
                jest.spyOn(mockCashPaymentMethodRepository, 'updateCashPaymentMethod')
                    .mockResolvedValue(mockCashPaymentMethodEntity);
        });

        when(/^o método updateCashPaymentMethod é chamado para atualizar o nome do método de pagamento em dinheiro "(.*)", de id "(.*)" e default "(.*)", para "(.*)"$/,
        async (oldCashName, cashId, cashDefault, newCashName) => {
            cashPaymentMethodReturned = await service.updateCashPaymentMethod(oldCashName, new CashPaymentMethodEntity({
                id: cashId,
                name: newCashName,
                default: cashDefault
            }));});

        then(/^o método de pagamento em dinheiro retornado deve ter id "(.*)", nome "(.*)" e default "(.*)"$/,
        (cashId, cashName, cashDefault) => {
            const cashPaymentMethodModel = new CashPaymentMethodModel(new CashPaymentMethodEntity({
                id: cashId,
                name: cashName,
                default: cashDefault
            }))
            expect(cashPaymentMethodReturned).toEqual(cashPaymentMethodModel);
            expect(mockCashPaymentMethodRepository.updateCashPaymentMethod).toBeCalledWith(nameToCall, entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Create cash payment method', ({ given, when, then }) => {
    given(
    /^o método createCashPaymentMethod chamado com "{id: "(.*)", name: "(.*)", default: "(.*)"}" do CashPaymentMethodService retorna um método de pagamento em dinheiro de id "(.*)", nome "(.*)" e default "(.*)"$/, 
            async (cashId1, cashName1, cashDefault1, cashId2, cashName2, cashDefault2) => {
                entityToCall = new CashPaymentMethodEntity({
                    id: cashId1,
                    name: cashName1,
                    default: cashDefault1
                });
                mockCashPaymentMethodEntity = new CashPaymentMethodEntity({
                    id: cashId2,
                    name: cashName2,
                    default: cashDefault2
                })
                jest.spyOn(mockCashPaymentMethodRepository, 'createCashPaymentMethod')
                    .mockResolvedValue(mockCashPaymentMethodEntity);
        });

        when(/^o método createCashPaymentMethod é chamado para criar o método de pagamento em dinheiro "(.*)", de id "(.*)" e default "(.*)"$/,
        async (cashName, cashId, cashDefault) => {
            cashPaymentMethodReturned = await service.createCashPaymentMethod(new CashPaymentMethodEntity({
                id: cashId,
                name: cashName,
                default: cashDefault
            }));});

        then(/^o método de pagamento em dinheiro retornado deve ter id "(.*)", nome "(.*)" e default "(.*)"$/,
        (cashId, cashName, cashDefault) => {
            const cashPaymentMethodModel = new CashPaymentMethodModel(new CashPaymentMethodEntity({
                id: cashId,
                name: cashName,
                default: cashDefault
            }))
            expect(cashPaymentMethodReturned).toEqual(cashPaymentMethodModel);
            expect(mockCashPaymentMethodRepository.createCashPaymentMethod).toBeCalledWith(entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Return all cash payment methods', ({ given, when, then }) => {
    given(
    /^o método getCashPaymentMethods do CashPaymentMethodService retorna um array com os métodos de pagamento em dinheiro "{id: "(.*)", name: "(.*)", default: "(.*)"}" e "{id: "(.*)", name: "(.*)", default: "(.*)"}"$/, 
            async (cashId1, cashName1, cashDefault1, cashId2, cashName2, cashDefault2) => {
                mockCashPaymentMethodEntityArray = [
                    new CashPaymentMethodEntity({
                        id: cashId1,
                        name: cashName1,
                        default: cashDefault1
                    }),
                    new CashPaymentMethodEntity({
                        id: cashId2,
                        name: cashName2,
                        default: cashDefault2
                    })]
                jest.spyOn(mockCashPaymentMethodRepository, 'getCashPaymentMethods')
                    .mockResolvedValue(mockCashPaymentMethodEntityArray);
        });

        when(/^o método getCashPaymentMethods é chamado$/,
        async () => {
            paymentMethodsReturnedArray = await service.getCashPaymentMethods();});

        then(/^o array retornado deve conter os métodos de pagamento em dinheiro "{id: "(.*)", name: "(.*)", default: "(.*)"}" e "{id: "(.*)", name: "(.*)", default: "(.*)"}"$/,
        (cashId1, cashName1, cashDefault1, cashId2, cashName2, cashDefault2) => {
            const cashPaymentMethodModelArray = [new CashPaymentMethodModel(new CashPaymentMethodEntity({
                id: cashId1,
                name: cashName1,
                default: cashDefault1
            })),
            new CashPaymentMethodModel(new CashPaymentMethodEntity({
                id: cashId2,
                name: cashName2,
                default: cashDefault2
            }))]
            expect(paymentMethodsReturnedArray).toEqual(cashPaymentMethodModelArray);
            expect(mockCashPaymentMethodRepository.getCashPaymentMethods).toBeCalledWith()
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Delete cash payment method', ({ given, when, then }) => {
    given(
    /^o método deleteCashPaymentMethod chamado com "(.*)" do CashPaymentMethodService não realiza retorno$/, 
            async (cashName) => {
                nameToCall = cashName;
                jest.spyOn(mockCashPaymentMethodRepository, 'deleteCashPaymentMethod')
                    .mockImplementation();
        });

        when(/^o método deleteCashPaymentMethod é chamado para remover o método de pagamento em dinheiro "(.*)"$/,
        async (cashName) => {
            voidReturned = await service.deleteCashPaymentMethod(cashName);});

        then(/^nada deve ser retornado$/,
        () => {
            expect(voidReturned).toBeUndefined();
            expect(mockCashPaymentMethodRepository.deleteCashPaymentMethod).toBeCalledWith(nameToCall)
        });});
});