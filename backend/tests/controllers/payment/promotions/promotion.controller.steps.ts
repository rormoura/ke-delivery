import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../../../src/app';
import { di } from '../../../../src/di';
import PromotionRepository from '../../../../src/repositories/payment/promotions/promotion.repository';
import PromotionEntity from '../../../../src/entities/payment/promotions/promotion.entity';

const feature = loadFeature('tests/features/payment/Promotions.feature');
const request = supertest(app);
defineFeature(feature, (test) => {
  // mocking the repository
  let mockPromotionRepository: PromotionRepository;
  let mockPromotionEntity: PromotionEntity;
  let responseGET: supertest.Response;
  let responsePOST: supertest.Response;
  let responseDELETE: supertest.Response;
  let responsePUT: supertest.Response;
  beforeEach(() => {
    mockPromotionRepository = di.getRepository<PromotionRepository>(PromotionRepository);
  });
  test('Adição de promoção realizada com sucesso (serviço)', ({ given, when, then, and }) => {
    given(/^o restaurante "Churras do Lucas" está armazenado no sistema$/, () => {});
    and(/o sistema contém somente 1 promoção do "Churras do Lucas": "(.*)", a qual aplica "(.*)" de desconto/,
    async (name, discount) => {
      mockPromotionEntity = await mockPromotionRepository.createPromotion(new PromotionEntity({
        "id": "1",
        "name": name,
        "discount": discount
      }))
    });
    when(
      /^o restaurante "Churras do Lucas" adiciona a promoção "(.*)", a qual aplica "(.*)" de desconto$/,
      async (name, discount) => {
        responsePOST = await request.post('/api/promotions/').send({
            "id": "2",
            "name": name,
            "discount": discount
        });
    });
    then(/^o restaurante "Churras do Lucas" permanece armazenado no sistema$/, () => {});
    and(/^o sistema agora contém 2 promoções do "Churras do Lucas": "(.*)", a qual aplica "(.*)" de desconto, "(.*)", a qual aplica "(.*)" de desconto$/,
    async (namePromotion1, discountPromotion1, namePromotion2, discountPromotion2) => {
            responseGET = await request.get('/api/promotions/');
            const existingPromotions = responseGET.body.data;
            expect(responseGET.status).toBe(200);
            expect(existingPromotions.length).toEqual(2);
            expect(existingPromotions.find((promotion: {name: string, discount: string}) => promotion.name == namePromotion1
            && promotion.discount == discountPromotion1)).toEqual(mockPromotionEntity);
            expect(existingPromotions.find((promotion: {name: string, discount: string}) => promotion.name == namePromotion2
            && promotion.discount == discountPromotion2)).toEqual(JSON.parse(responsePOST.text).data)
        });
    });
//-------------------------------------------------------------------------------------------------------------------------------
    test('Adição de promoção já existente (serviço)', ({ given, when, then, and }) => {
        given(/^o restaurante "Churras do Lucas" está armazenado no sistema$/, () => {});
        and(/o sistema contém somente 1 promoção do "Churras do Lucas": "(.*)", a qual aplica "(.*)" de desconto/,
        async (name, discount) => {
            (await mockPromotionRepository.getPromotions()).forEach(async promotion => {await mockPromotionRepository.deletePromotion(promotion.name);})
            mockPromotionEntity = await mockPromotionRepository.createPromotion(new PromotionEntity({
                "id": "1",
                "name": name,
                "discount": discount
            }))
        });
        when(
        /^o restaurante "Churras do Lucas" adiciona a promoção "(.*)", a qual aplica "(.*)" de desconto$/,
        async (name, discount) => {
            responsePOST = await request.post('/api/promotions/').send({
                "id": "2",
                "name": name,
                "discount": discount
            });
        });
        then(/^o restaurante "Churras do Lucas" permanece armazenado no sistema$/, () => {});
        and(/^o sistema contém somente 1 promoção do "Churras do Lucas": "(.*)", a qual aplica "(.*)" de desconto$/,
        async (name, discount) => {
            responseGET = await request.get('/api/promotions/');
            const existingPromotions = responseGET.body.data;
            expect(responseGET.status).toBe(200);
            expect(JSON.parse(responsePOST.text).msg).toEqual("Promotion already exists")
            expect(existingPromotions.length).toEqual(1);
            expect(existingPromotions.find((promotion: {name: string, discount: string}) => promotion.name == name
            && promotion.discount == discount)).toEqual(mockPromotionEntity);
        });
    });
//-------------------------------------------------------------------------------------------------------------------------------
    test('Remoção de promoção realizada com sucesso (serviço)', ({ given, when, then, and }) => {
        given(/^o restaurante "Churras do Lucas" está armazenado no sistema$/, () => {});
        and(/o sistema contém somente 1 promoção do "Churras do Lucas": "(.*)", a qual aplica "(.*)" de desconto/,
        async (name, discount) => {
            (await mockPromotionRepository.getPromotions()).forEach(async promotion => {await mockPromotionRepository.deletePromotion(promotion.name);})
            mockPromotionEntity = await mockPromotionRepository.createPromotion(new PromotionEntity({
                "id": "1",
                "name": name,
                "discount": discount
            }))
        });
        when(
        /^o restaurante "Churras do Lucas" remove a promoção "(.*)"$/,
        async (name) => {
            responseDELETE = await request.delete('/api/promotions/'+name);
        });
        then(/^o restaurante "Churras do Lucas" permanece armazenado no sistema$/, () => {});
        and(/^o sistema não contém nenhuma promoção do "Churras do Lucas"$/,
        async () => {
            responseGET = await request.get('/api/promotions/');
            const existingPromotions = responseGET.body.data;
            expect(responseGET.status).toBe(200);
            expect(responseDELETE.status).toBe(200);
            expect(existingPromotions).toEqual([]);
        });
    });
//-------------------------------------------------------------------------------------------------------------------------------
    test('Atualização de promoção realizada com sucesso (serviço)', ({ given, when, then, and }) => {
        given(/^o restaurante "Churras do Lucas" está armazenado no sistema$/, () => {});
        and(/o sistema contém somente 1 promoção do "Churras do Lucas": "(.*)", a qual aplica "(.*)" de desconto/,
        async (name, discount) => {
            (await mockPromotionRepository.getPromotions()).forEach(async promotion => {await mockPromotionRepository.deletePromotion(promotion.name);})
            mockPromotionEntity = await mockPromotionRepository.createPromotion(new PromotionEntity({
                "id": "1",
                "name": name,
                "discount": discount
            }))
        });
        when(
        /^o restaurante "Churras do Lucas" define que a promoção "(.*)" agora aplica "(.*)" de desconto$/,
        async (name, newDiscount) => {
            responsePUT = await request.put('/api/promotions/'+name).send({
                "id": mockPromotionEntity.id,
                "name": name,
                "discount": newDiscount
            });
        });
        then(/^o restaurante "Churras do Lucas" permanece armazenado no sistema$/, () => {});
        and(/^o sistema contém somente 1 promoção do "Churras do Lucas": "(.*)", a qual aplica "(.*)" de desconto$/,
        async (name, discount) => {
            responseGET = await request.get('/api/promotions/');
            const existingPromotions = responseGET.body.data;
            expect(responseGET.status).toBe(200);
            expect(responsePUT.status).toBe(200);
            expect(existingPromotions.length).toEqual(1)
            expect(existingPromotions.find((promotion: {name: string, discount: string}) => promotion.name == mockPromotionEntity.name
            && promotion.name == name
            && promotion.discount == discount)).toEqual(JSON.parse(responsePUT.text).data);
        });
    });

});