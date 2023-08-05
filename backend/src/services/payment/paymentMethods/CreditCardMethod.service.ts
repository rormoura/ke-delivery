import CreditCardPaymentMethodEntity from '../../../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import CreditCardPaymentMethodModel from '../../../models/payment/paymentMethods/CreditCardPaymentMethod.model';
import CreditCardPaymentMethodRepository from '../../../repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import { HttpNotFoundError } from '../../../utils/errors/http.error';

class CreditCardPaymentMethodServiceMessageCode {
  public static readonly CreditCardPaymentMethod_not_found = 'CreditCardPaymentMethod_not_found';
}

class CreditCardPaymentMethodService {
  private CreditCardPaymentMethodRepository: CreditCardPaymentMethodRepository;

  constructor(
    CreditCardPaymentMethodRepository: CreditCardPaymentMethodRepository,
  ) {
    this.CreditCardPaymentMethodRepository = CreditCardPaymentMethodRepository;
  }

  public async getCreditCardPaymentMethods(): Promise<CreditCardPaymentMethodModel[]> {
    const CreditCardPaymentMethodEntity = await this.CreditCardPaymentMethodRepository.getCreditCardPaymentMethods();

    const creditCardPaymentMethodModel = CreditCardPaymentMethodEntity.map((CreditCardPaymentMethod) => new CreditCardPaymentMethodModel(CreditCardPaymentMethod));

    return creditCardPaymentMethodModel;
  }

  public async getCreditCardPaymentMethod(id: string): Promise<CreditCardPaymentMethodModel> {
    const CreditCardPaymentMethodEntity = await this.CreditCardPaymentMethodRepository.getCreditCardPaymentMethod(id);

    if (!CreditCardPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'CreditCardPaymentMethod not found',
        msgCode: CreditCardPaymentMethodServiceMessageCode.CreditCardPaymentMethod_not_found,
      });
    }

    const creditCardPaymentMethodModel = new CreditCardPaymentMethodModel(CreditCardPaymentMethodEntity);

    return creditCardPaymentMethodModel;
  }

  public async createCreditCardPaymentMethod(data: CreditCardPaymentMethodEntity): Promise<CreditCardPaymentMethodModel> {
    const CreditCardPaymentMethodEntity = await this.CreditCardPaymentMethodRepository.createCreditCardPaymentMethod(data);
    const creditCardPaymentMethodModel = new CreditCardPaymentMethodModel(CreditCardPaymentMethodEntity);

    return creditCardPaymentMethodModel;
  }

  public async updateCreditCardPaymentMethod(id: string, data: CreditCardPaymentMethodEntity): Promise<CreditCardPaymentMethodModel> {
    const CreditCardPaymentMethodEntity = await this.CreditCardPaymentMethodRepository.updateCreditCardPaymentMethod(id, data);

    if (!CreditCardPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'CreditCardPaymentMethod not found',
        msgCode: CreditCardPaymentMethodServiceMessageCode.CreditCardPaymentMethod_not_found,
      });
    }

    const creditCardPaymentMethodModel = new CreditCardPaymentMethodModel(CreditCardPaymentMethodEntity);

    return creditCardPaymentMethodModel;
  }

  public async deleteCreditCardPaymentMethod(id: string): Promise<void> {
    await this.CreditCardPaymentMethodRepository.deleteCreditCardPaymentMethod(id);
  }
}

export default CreditCardPaymentMethodService;
