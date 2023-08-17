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
  afterEach(async () => {
    (await mockPromotionRepository.getPromotions()).forEach(async promotion => {await mockPromotionRepository.deletePromotion(promotion.name);})
  })
  test('Adição de promoção realizada com sucesso (serviço)', ({ given, when, then, and }) => {
    given(/o sistema contém somente 1 promoção: "(.*)", a qual aplica "(.*)" de desconto/,
    async (name, discount) => {
      mockPromotionEntity = await mockPromotionRepository.createPromotion(new PromotionEntity({
        "id": "1",
        "name": name,
        "discount": discount
      }))
    });
    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com name="(.*)", discount="(.*)"$/,
      async (URL, name, discount) => {
        responsePOST = await request.post(URL).send({
            "name": name,
            "discount": discount
        });
    });
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(responsePOST.status).toBe(parseInt(statusCode, 10));
    });
    and(/^o sistema agora contém 2 promoções: "(.*)", a qual aplica "(.*)" de desconto, "(.*)", a qual aplica "(.*)" de desconto$/,
    async (namePromotion1, discountPromotion1, namePromotion2, discountPromotion2) => {
            responseGET = await request.get('/api/promotions/');
            const existingPromotions = responseGET.body.data;
            expect(existingPromotions.length).toEqual(2);
            expect(existingPromotions.find((promotion: {name: string, discount: string}) => promotion.name == namePromotion1
            && promotion.discount == discountPromotion1)).toEqual(mockPromotionEntity);
            expect(existingPromotions.find((promotion: {name: string, discount: string}) => promotion.name == namePromotion2
            && promotion.discount == discountPromotion2)).toEqual(JSON.parse(responsePOST.text).data)
        });
    });
//-------------------------------------------------------------------------------------------------------------------------------
    test('Adição de promoção já existente (serviço)', ({ given, when, then, and }) => {
        given(/o sistema contém somente 1 promoção: "(.*)", a qual aplica "(.*)" de desconto/,
        async (name, discount) => {
            (await mockPromotionRepository.getPromotions()).forEach(async promotion => {await mockPromotionRepository.deletePromotion(promotion.name);})
            mockPromotionEntity = await mockPromotionRepository.createPromotion(new PromotionEntity({
                "id": "1",
                "name": name,
                "discount": discount
            }))
        });
        when(
        /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com name="(.*)", discount="(.*)"$/,
        async (URL, name, discount) => {
            responsePOST = await request.post(URL).send({
                "name": name,
                "discount": discount
            });
        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(responsePOST.status).toBe(parseInt(statusCode, 10));
        });
        and(/^o sistema contém somente 1 promoção: "(.*)", a qual aplica "(.*)" de desconto$/,
        async (name, discount) => {
            responseGET = await request.get('/api/promotions/');
            const existingPromotions = responseGET.body.data;
            expect(existingPromotions.length).toEqual(1);
            expect(existingPromotions.find((promotion: {name: string, discount: string}) => promotion.name == name
            && promotion.discount == discount)).toEqual(mockPromotionEntity);
        });
    });
//-------------------------------------------------------------------------------------------------------------------------------
    test('Remoção de promoção realizada com sucesso (serviço)', ({ given, when, then, and }) => {
        given(/o sistema contém somente 1 promoção: "(.*)", a qual aplica "(.*)" de desconto/,
        async (name, discount) => {
            mockPromotionEntity = await mockPromotionRepository.createPromotion(new PromotionEntity({
                "id": "1",
                "name": name,
                "discount": discount
            }))
        });
        when(
        /^uma requisição DELETE for enviada para "(.*)"$/,
        async (URL) => {
            responseDELETE = await request.delete(URL);
        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(responseDELETE.status).toBe(parseInt(statusCode, 10));
        });
        and(/^o sistema não contém nenhuma promoção$/,
        async () => {
            responseGET = await request.get('/api/promotions/');
            const existingPromotions = responseGET.body.data;
            expect(existingPromotions).toEqual([]);
        });
    });
//-------------------------------------------------------------------------------------------------------------------------------
    test('Atualização de promoção realizada com sucesso (serviço)', ({ given, when, then, and }) => {
        given(/o sistema contém somente 1 promoção: "(.*)", a qual aplica "(.*)" de desconto/,
        async (name, discount) => {
            mockPromotionEntity = await mockPromotionRepository.createPromotion(new PromotionEntity({
                "id": "1",
                "name": name,
                "discount": discount
            }))
        });
        when(
        /^uma requisição UPDATE for enviada para "(.*)" com o corpo da requisição sendo um JSON com name="(.*)", discount="(.*)"$/,
        async (URL, name, newDiscount) => {
            responsePUT = await request.put(URL).send({
                "name": name,
                "discount": newDiscount
            });
        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(responsePUT.status).toBe(parseInt(statusCode, 10));
        });
        and(/^o sistema contém somente 1 promoção: "(.*)", a qual aplica "(.*)" de desconto$/,
        async (name, discount) => {
            responseGET = await request.get('/api/promotions/');
            const existingPromotions = responseGET.body.data;
            expect(existingPromotions.length).toEqual(1)
            expect(existingPromotions.find((promotion: {name: string, discount: string}) => promotion.name == mockPromotionEntity.name
            && promotion.name == name
            && promotion.discount == discount)).toEqual(JSON.parse(responsePUT.text).data);
        });
    });});
