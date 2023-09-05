import { loadFeature, defineFeature } from 'jest-cucumber';
import PromotionRepository from '../../../../src/repositories/payment/promotions/promotion.repository';
import PromotionEntity from '../../../../src/entities/payment/promotions/promotion.entity';
import PromotionService from '../../../../src/services/payment/promotions/promotion.service';
import PromotionModel from '../../../../src/models/payment/promotions/promotion.model';
const feature = loadFeature('tests/features/payment/promotions-service.feature');
defineFeature(feature, (test) => {
    // mocking the repository
    let mockPromotionRepository: PromotionRepository;
    let service: PromotionService;
    let nameToCall: string;
    let entityToCall: PromotionEntity;
    let promotionReturned: PromotionEntity;
    let promotionsReturnedArray: PromotionEntity[];
    let voidReturned: void;
    let mockPromotionEntity: PromotionEntity;
    let mockPromotionEntityArray: PromotionEntity[];

    beforeEach(() => {
        mockPromotionRepository = {
            getPromotions: jest.fn(),
            getPromotion: jest.fn(),
            createPromotion: jest.fn(),
            updatePromotion: jest.fn(),
            deletePromotion: jest.fn(),
        } as any;
        service = new PromotionService(mockPromotionRepository);
    });

    test('Update promotion name', ({ given, when, then }) => {
given(
/^o método updatePromotion chamado com "(.*)" e "{id: "(.*)", name: "(.*)", discount: "(.*)"}" do PromotionService retorna uma promoção de id "(.*)", nome "(.*)" e desconto "(.*)"$/, 
            async (promoName1, promoId1, newPromoName, promoDiscount1, promoId, promoName2, promoDiscount2) => {
                nameToCall = promoName1;
                entityToCall = new PromotionEntity({
                    id: promoId1,
                    name: newPromoName,
                    discount: promoDiscount1
                });
                mockPromotionEntity = new PromotionEntity({
                    id: promoId,
                    name: promoName2,
                    discount: promoDiscount2
                })
                jest.spyOn(mockPromotionRepository, 'updatePromotion')
                    .mockResolvedValue(mockPromotionEntity);
        });

        when(/^o método updatePromotion é chamado para atualizar o nome da promoção "(.*)", de id "(.*)" e desconto "(.*)", para "(.*)"$/,
        async (oldPromoName, promoId, promoDiscount, newPromoName) => {
            promotionReturned = await service.updatePromotion(oldPromoName, new PromotionEntity({
                id: promoId,
                name: newPromoName,
                discount: promoDiscount
            }));});

        then(/^a promoção retornada deve ter id "(.*)", nome "(.*)" e desconto "(.*)"$/,
        (promoId, promoName, promoDiscount) => {
            const promotionModel = new PromotionModel(new PromotionEntity({
                id: promoId,
                name: promoName,
                discount: promoDiscount
            }))
            expect(promotionReturned).toEqual(promotionModel);
            expect(mockPromotionRepository.updatePromotion).toBeCalledWith(nameToCall, entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Create promotion', ({ given, when, then }) => {
    given(
    /^o método createPromotion chamado com "{id: "(.*)", name: "(.*)", discount: "(.*)"}" do PromotionService retorna uma promoção de id "(.*)", nome "(.*)" e desconto "(.*)"$/, 
            async (promoId1, promoName1, promoDiscount1, promoId2, promoName2, promoDiscount2) => {
                entityToCall = new PromotionEntity({
                    id: promoId1,
                    name: promoName1,
                    discount: promoDiscount1
                });
                mockPromotionEntity = new PromotionEntity({
                    id: promoId2,
                    name: promoName2,
                    discount: promoDiscount2
                })
                jest.spyOn(mockPromotionRepository, 'createPromotion')
                    .mockResolvedValue(mockPromotionEntity);
        });

        when(/^o método createPromotion é chamado para criar a promoção "(.*)", de id "(.*)" e desconto "(.*)"$/,
        async (promoName, promoId, promoDiscount) => {
            promotionReturned = await service.createPromotion(new PromotionEntity({
                id: promoId,
                name: promoName,
                discount: promoDiscount
            }));});

        then(/^a promoção retornada deve ter id "(.*)", nome "(.*)" e desconto "(.*)"$/,
        (promoId, promoName, promoDiscount) => {
            const promotionModel = new PromotionModel(new PromotionEntity({
                id: promoId,
                name: promoName,
                discount: promoDiscount
            }))
            expect(promotionReturned).toEqual(promotionModel);
            expect(mockPromotionRepository.createPromotion).toBeCalledWith(entityToCall)
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Return all promotions', ({ given, when, then }) => {
    given(
    /^o método getPromotions do PromotionService retorna um array com as promoções "{id: "(.*)", name: "(.*)", discount: "(.*)"}" e "{id: "(.*)", name: "(.*)", discount: "(.*)"}"$/, 
            async (promoId1, promoName1, promoDiscount1, promoId2, promoName2, promoDiscount2) => {
                mockPromotionEntityArray = [
                    new PromotionEntity({
                        id: promoId1,
                        name: promoName1,
                        discount: promoDiscount1
                    }),
                    new PromotionEntity({
                        id: promoId2,
                        name: promoName2,
                        discount: promoDiscount2
                    })]
                jest.spyOn(mockPromotionRepository, 'getPromotions')
                    .mockResolvedValue(mockPromotionEntityArray);
        });

        when(/^o método getPromotions é chamado$/,
        async () => {
            promotionsReturnedArray = await service.getPromotions();});

        then(/^o array retornado deve conter as promoções "{id: "(.*)", name: "(.*)", discount: "(.*)"}" e "{id: "(.*)", name: "(.*)", discount: "(.*)"}"$/,
        (promoId1, promoName1, promoDiscount1, promoId2, promoName2, promoDiscount2) => {
            const promotionModelArray = [new PromotionModel(new PromotionEntity({
                id: promoId1,
                name: promoName1,
                discount: promoDiscount1
            })),
            new PromotionModel(new PromotionEntity({
                id: promoId2,
                name: promoName2,
                discount: promoDiscount2
            }))]
            expect(promotionsReturnedArray).toEqual(promotionModelArray);
            expect(mockPromotionRepository.getPromotions).toBeCalledWith()
        });});
//-------------------------------------------------------------------------------------------------------------------------------------
test('Delete promotion', ({ given, when, then }) => {
    given(
    /^o método deletePromotion chamado com "(.*)" do PromotionService não realiza retorno$/, 
            async (promoName) => {
                nameToCall = promoName;
                jest.spyOn(mockPromotionRepository, 'deletePromotion')
                    .mockImplementation();
        });

        when(/^o método deletePromotion é chamado para remover a promoção "(.*)"$/,
        async (promoName) => {
            voidReturned = await service.deletePromotion(promoName);});

        then(/^nada deve ser retornado$/,
        () => {
            expect(voidReturned).toBeUndefined();
            expect(mockPromotionRepository.deletePromotion).toBeCalledWith(nameToCall)
        });});
});