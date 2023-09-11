import CreditCardPaymentMethodEntity from '../../../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import CreditCardPaymentMethodModel from '../../../models/payment/paymentMethods/CreditCardPaymentMethod.model';
import CreditCardPaymentMethodRepository from '../../../repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import { HttpNotFoundError, HttpForbiddenError } from '../../../utils/errors/http.error';

class CreditCardPaymentMethodServiceMessageCode {
  public static readonly CreditCardPaymentMethod_not_found = 'CreditCardPaymentMethod_not_found';
  public static readonly CreditCardPaymentMethod_incomplete = 'CreditCardPaymentMethod_incomplete';
  public static readonly CreditCardPaymentMethod_already_exists = 'Credit Card Payment Method already exists';
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

  public async getCreditCardPaymentMethod(name: string): Promise<CreditCardPaymentMethodModel> {
    const CreditCardPaymentMethodEntity = await this.CreditCardPaymentMethodRepository.getCreditCardPaymentMethod(name);

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
    if(data.name === '' || data.cardHolderName === '' || data.cardNumber === '' || data.expirationDate === '' || data.cvv === ''){
      throw new HttpForbiddenError({
        msg: 'Credit Card payment method incomplete',
        msgCode: CreditCardPaymentMethodServiceMessageCode.CreditCardPaymentMethod_incomplete,
      });
    }

    const CreditCardEntityAlreadyExists = await this.CreditCardPaymentMethodRepository.getCreditCardPaymentMethod(data.name);
    if(CreditCardEntityAlreadyExists){
      throw new HttpForbiddenError({
        msg: 'Credit Card Payment Method already exists',
        msgCode: CreditCardPaymentMethodServiceMessageCode.CreditCardPaymentMethod_already_exists,
      });
    }

    const CreditCardPaymentMethodEntity = await this.CreditCardPaymentMethodRepository.createCreditCardPaymentMethod(data);
    const creditCardPaymentMethodModel = new CreditCardPaymentMethodModel(CreditCardPaymentMethodEntity);

    return creditCardPaymentMethodModel;
  }

  public async updateCreditCardPaymentMethod(name: string, data: CreditCardPaymentMethodEntity): Promise<CreditCardPaymentMethodModel> {
    if(data.name === '' || data.cardHolderName === '' || data.cardNumber === '' || data.expirationDate === '' || data.cvv === ''){
      throw new HttpForbiddenError({
        msg: 'Credit Card payment method incomplete',
        msgCode: CreditCardPaymentMethodServiceMessageCode.CreditCardPaymentMethod_incomplete,
      });
    }
    
    const CreditCardPaymentMethodEntityAlreadyExists = await this.CreditCardPaymentMethodRepository.getCreditCardPaymentMethod(data.name);
    if(CreditCardPaymentMethodEntityAlreadyExists){
      throw new HttpForbiddenError({
        msg: 'CreditCard Payment Method already exists',
        msgCode: CreditCardPaymentMethodServiceMessageCode.CreditCardPaymentMethod_already_exists,
      });
    }

    const CreditCardPaymentMethodEntity = await this.CreditCardPaymentMethodRepository.updateCreditCardPaymentMethod(name, data);
    if (!CreditCardPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'CreditCardPaymentMethod not found',
        msgCode: CreditCardPaymentMethodServiceMessageCode.CreditCardPaymentMethod_not_found,
      });
    }

    const creditCardPaymentMethodModel = new CreditCardPaymentMethodModel(CreditCardPaymentMethodEntity);

    return creditCardPaymentMethodModel;
  }

  public async deleteCreditCardPaymentMethod(name: string): Promise<void> {
    await this.CreditCardPaymentMethodRepository.deleteCreditCardPaymentMethod(name);
  }
}

export default CreditCardPaymentMethodService;
