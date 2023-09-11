import { loadFeature, defineFeature } from 'jest-cucumber';
import DeliverymanRepository from '../../../src/repositories/deliverymans/deliveryman.repository';
import DeliverymanEntity from '../../../src/entities/deliverymans/deliveryman.entity';
import DeliverymanService from '../../../src/services/deliverymans/deliveryman.service';
import DeliverymanModel from '../../../src/models/deliverymans/deliveryman.model';
const feature = loadFeature('tests/features/deliverymans/Deliverymans.service.feature');
defineFeature(feature, (test) => {
    // mocking the repository
    let mockDeliverymanRepository: DeliverymanRepository;
    let service: DeliverymanService;
    let idToCall: string;
    let entityToCall: DeliverymanEntity;
    let DeliverymanReturned: DeliverymanEntity;
    let DeliverymansReturnedArray: DeliverymanEntity[];
    let voidReturned: void;
    let mockDeliverymanEntity: DeliverymanEntity;
    let mockDeliverymanEntityArray: DeliverymanEntity[];

    beforeEach(() => {
        mockDeliverymanRepository = {
            getDeliverymans: jest.fn(),
            getDeliveryman: jest.fn(),
            createDeliveryman: jest.fn(),
            updateDeliveryman: jest.fn(),
            deleteDeliveryman: jest.fn(),
        } as any;
        service = new DeliverymanService(mockDeliverymanRepository);
    });

    //-------------------------------------------------------------------------------------------------------------------------------------
    test('Update deliveryman name', ({ given, when, then }) => {
        given(/^o método updateDeliveryman chamado com "(.*)" e {id: "(.*)", name: "(.*)", email: "(.*)", numOrders: "(.*)", numRates: "(.*)"} do DeliverymanService retorna um entregador de id "(.*)", nome "(.*)", email "(.*)", numOrders: "(.*)" e numRates: "(.*)"$/, 
            async (id1, idValue, nameValue, emailValue, numOrdersValue, numRatesValue, idValue2, nameValue2, emailValue2, numOrdersValue2, numRatesValue2) => {
                const idToCall = id1;
                entityToCall = new DeliverymanEntity({
                    id: idValue,
                    name: nameValue,
                    email: emailValue,
                    numOrders:numOrdersValue,
                    numRates: numRatesValue
                });
                mockDeliverymanEntity = new DeliverymanEntity({
                    id: idValue,
                    name: nameValue,
                    email: emailValue,
                    numOrders:numOrdersValue,
                    numRates: numRatesValue
                })
                jest.spyOn(mockDeliverymanRepository, 'updateDeliveryman')
                    .mockResolvedValue(mockDeliverymanEntity);
        });

        when(/^o método updateDeliveryman é chamado para atualizar o nome do entregador "(.*)", de id "(.*)", email "(.*)", numOrders: "(.*)" e numRates: "(.*)"$/,
        async (nameValue, idValue, emailValue, numOrdersValue, numRatesValue) => {
            DeliverymanReturned = await service.updateDeliveryman(idValue, entityToCall);
        });

        then(/^o entregador retornado deve ter id "(.*)", nome "(.*)", email "(.*)", numOrders: "(.*)" e numRates: "(.*)"$/,
        (idValue, nameValue, emailValue, numOrdersValue, numRatesValue) => {
            const deliverymanModel = new DeliverymanModel(new DeliverymanEntity({
                id: idValue,
                name: nameValue,
                email: emailValue,
                numOrders:numOrdersValue,
                numRates: numRatesValue
            }))
            expect(DeliverymanReturned).toEqual(deliverymanModel);
            expect(mockDeliverymanRepository.updateDeliveryman).toBeCalledWith(idValue, entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Create deliveryman', ({ given, when, then }) => {
    given(
    /^o método createDeliveryman chamado com {id: "(.*)", name: "(.*)", email: "(.*)", numOrders: "(.*)", numRates: "(.*)"} do DeliverymanService retorna um entregador de id "(.*)", nome "(.*)", email "(.*)" numOrders: "(.*)" e numRates: "(.*)"$/, 
            async (idValue, nameValue, emailValue, numOrdersValue, numRatesValue, idValue2, nameValue2, emailValue2, numOrdersValue2, numRatesValue2) => {
                entityToCall = new DeliverymanEntity({
                    id: idValue,
                    name: nameValue,
                    email: emailValue,
                    numOrders:numOrdersValue,
                    numRates: numRatesValue
                });
                mockDeliverymanEntity = new DeliverymanEntity({
                    id: idValue2,
                    name: nameValue2,
                    email: emailValue2,
                    numOrders:numOrdersValue2,
                    numRates: numRatesValue2
                })
                jest.spyOn(mockDeliverymanRepository, 'createDeliveryman')
                    .mockResolvedValue(mockDeliverymanEntity);
        });

        when(/^o método createDeliveryman é chamado para criar o entregador "(.*)", de id "(.*)", email "(.*)", numOrders "(.*)" e numRates: "(.*)"$/,
        async ( nameValue, idValue, emailValue, numOrdersValue, numRatesValue) => {
            DeliverymanReturned = await service.createDeliveryman(new DeliverymanEntity({
                id: idValue,
                name: nameValue,
                email: emailValue,
                numOrders:numOrdersValue,
                numRates: numRatesValue
            }));});

        then(/^o entregador retornado deve ter nome "(.*)", id "(.*)", email "(.*)", numOrders "(.*)" e numRates: "(.*)"$/,
        (nameValue, idValue, emailValue, numOrdersValue, numRatesValue) => {
            const deliverymanModel = new DeliverymanModel(new DeliverymanEntity({
                id: idValue,
                name: nameValue,
                email: emailValue,
                numOrders:numOrdersValue,
                numRates: numRatesValue
            }))
            expect(DeliverymanReturned).toEqual(deliverymanModel);
            expect(mockDeliverymanRepository.createDeliveryman).toBeCalledWith(entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Read all deliverymans', ({ given, when, then }) => {
    given(
    /^o método getDeliverymans do DeliverymanService retorna um array com os entregadores {id: "(.*)", name: "(.*)", email: "(.*)", numOrders: "(.*)", numRates: "(.*)"} e {id: "(.*)", name: "(.*)", email: "(.*)", numOrders: "(.*)", numRates: "(.*)"}$/, 
            async (idValue, nameValue, emailValue, numOrdersValue, numRatesValue, idValue2, nameValue2, emailValue2, numOrdersValue2, numRatesValue2) => {
                mockDeliverymanEntityArray = [
                    new DeliverymanEntity({
                        id: idValue,
                        name: nameValue,
                        email: emailValue,
                        numOrders:numOrdersValue,
                        numRates: numRatesValue
                    }),
                    new DeliverymanEntity({
                        id: idValue2,
                        name: nameValue2,
                        email: emailValue2,
                        numOrders:numOrdersValue2,
                        numRates: numRatesValue2
                    })]
                jest.spyOn(mockDeliverymanRepository, 'getDeliverymans')
                    .mockResolvedValue(mockDeliverymanEntityArray);
        });

        when(/^o método getDeliverymans é chamado$/,
        async () => {
            DeliverymansReturnedArray = await service.getDeliverymans();});

        then(/^o array retornado deve conter os entregadores {id: "(.*)", name: "(.*)", email: "(.*)", numOrders: "(.*)", numRates: "(.*)"} e {id: "(.*)", name: "(.*)", email: "(.*)", numOrders: "(.*)", numRates: "(.*)"}$/,
        (idValue, nameValue, emailValue, numOrdersValue, numRatesValue, idValue2, nameValue2, emailValue2, numOrdersValue2, numRatesValue2) => {
            const deliverymanModelArray = [new DeliverymanModel(new DeliverymanEntity({
                id: idValue,
                name: nameValue,
                email: emailValue,
                numOrders:numOrdersValue,
                numRates: numRatesValue
            })),
            new DeliverymanModel(new DeliverymanEntity({
                id: idValue2,
                name: nameValue2,
                email: emailValue2,
                numOrders:numOrdersValue2,
                numRates: numRatesValue2
            }))]
            expect(DeliverymansReturnedArray).toEqual(deliverymanModelArray);
            expect(mockDeliverymanRepository.getDeliverymans).toBeCalledWith()
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Delete deliveryman', ({ given, when, then }) => {
    given(
    /^o método deleteDeliveryman chamado com "(.*)" do DeliverymanService não realiza retorno$/, 
            async (idValue) => {
                idToCall = idValue;
                jest.spyOn(mockDeliverymanRepository, 'deleteDeliveryman')
                    .mockImplementation();
        });

        when(/^o método deleteDeliveryman é chamado para remover o entregador com id "(.*)"$/,
        async (idValue) => {
            voidReturned = await service.deleteDeliveryman(idValue);});

        then(/^nada deve ser retornado$/,
        () => {
            expect(voidReturned).toBeUndefined();
            expect(mockDeliverymanRepository.deleteDeliveryman).toBeCalledWith(idToCall)
        });});
});