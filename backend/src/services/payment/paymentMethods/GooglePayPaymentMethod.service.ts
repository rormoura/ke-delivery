import GooglePayPaymentMethodEntity from '../../../entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import GooglePayPaymentMethodModel from '../../../models/payment/paymentMethods/GooglePayPaymentMethod.model';
import GooglePayPaymentMethodRepository from '../../../repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import { HttpNotFoundError, HttpForbiddenError } from '../../../utils/errors/http.error';

class GooglePayPaymentMethodServiceMessageCode {
  public static readonly GooglePayPaymentMethod_not_found = 'GooglePayPaymentMethod_not_found';
  public static readonly GooglePayPaymentMethod_incomplete = 'GooglePayPaymentMethod_incomplete';
  public static readonly GooglePayPaymentMethod_already_exists = 'Google Pay Payment Method already exists';
}

class GooglePayPaymentMethodService {
  private GooglePayPaymentMethodRepository: GooglePayPaymentMethodRepository;

  constructor(
    GooglePayPaymentMethodRepository: GooglePayPaymentMethodRepository,
  ) {
    this.GooglePayPaymentMethodRepository = GooglePayPaymentMethodRepository;
  }

  public async getGooglePayPaymentMethods(): Promise<GooglePayPaymentMethodModel[]> {
    const GooglePayPaymentMethodEntity = await this.GooglePayPaymentMethodRepository.getGooglePayPaymentMethods();

    const googlePayPaymentMethodModel = GooglePayPaymentMethodEntity.map((GooglePayPaymentMethod) => new GooglePayPaymentMethodModel(GooglePayPaymentMethod));

    return googlePayPaymentMethodModel;
  }

  public async getGooglePayPaymentMethod(name: string): Promise<GooglePayPaymentMethodModel> {
    const GooglePayPaymentMethodEntity = await this.GooglePayPaymentMethodRepository.getGooglePayPaymentMethod(name);

    if (!GooglePayPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'GooglePayPaymentMethod not found',
        msgCode: GooglePayPaymentMethodServiceMessageCode.GooglePayPaymentMethod_not_found,
      });
    }

    const googlePayPaymentMethodModel = new GooglePayPaymentMethodModel(GooglePayPaymentMethodEntity);

    return googlePayPaymentMethodModel;
  }

  public async createGooglePayPaymentMethod(data: GooglePayPaymentMethodEntity): Promise<GooglePayPaymentMethodModel> {
    if(data.name === ''){
      throw new HttpForbiddenError({
        msg: 'Google Pay payment method incomplete',
        msgCode: GooglePayPaymentMethodServiceMessageCode.GooglePayPaymentMethod_incomplete,
      });
    }

    const GooglePayEntityAlreadyExists = await this.GooglePayPaymentMethodRepository.getGooglePayPaymentMethod(data.name);
    if(GooglePayEntityAlreadyExists){
      throw new HttpForbiddenError({
        msg: 'Google Pay Payment Method already exists',
        msgCode: GooglePayPaymentMethodServiceMessageCode.GooglePayPaymentMethod_already_exists,
      });
    }

    const GooglePayPaymentMethodEntity = await this.GooglePayPaymentMethodRepository.createGooglePayPaymentMethod(data);
    const googlePayPaymentMethodModel = new GooglePayPaymentMethodModel(GooglePayPaymentMethodEntity);

    return googlePayPaymentMethodModel;
  }

  public async updateGooglePayPaymentMethod(name: string, data: GooglePayPaymentMethodEntity): Promise<GooglePayPaymentMethodModel> {
    if(data.name === ''){
      throw new HttpForbiddenError({
        msg: 'Google Pay payment method incomplete',
        msgCode: GooglePayPaymentMethodServiceMessageCode.GooglePayPaymentMethod_incomplete,
      });
    }

    const GooglePayPaymentMethodEntityAlreadyExists = await this.GooglePayPaymentMethodRepository.getGooglePayPaymentMethod(data.name);
    if(GooglePayPaymentMethodEntityAlreadyExists){
      throw new HttpForbiddenError({
        msg: 'GooglePay Payment Method already exists',
        msgCode: GooglePayPaymentMethodServiceMessageCode.GooglePayPaymentMethod_already_exists,
      });
    }

    const GooglePayPaymentMethodEntity = await this.GooglePayPaymentMethodRepository.updateGooglePayPaymentMethod(name, data);
    if (!GooglePayPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'GooglePayPaymentMethod not found',
        msgCode: GooglePayPaymentMethodServiceMessageCode.GooglePayPaymentMethod_not_found,
      });
    }

    const googlePayPaymentMethodModel = new GooglePayPaymentMethodModel(GooglePayPaymentMethodEntity);

    return googlePayPaymentMethodModel;
  }

  public async deleteGooglePayPaymentMethod(name: string): Promise<void> {
    await this.GooglePayPaymentMethodRepository.deleteGooglePayPaymentMethod(name);
  }
}

export default GooglePayPaymentMethodService;
