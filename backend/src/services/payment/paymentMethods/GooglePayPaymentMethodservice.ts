import GooglePayPaymentMethodEntity from '../../../entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import GooglePayPaymentMethodModel from '../../../models/payment/paymentMethods/GooglePayPaymentMethod.model';
import GooglePayPaymentMethodRepository from '../../../repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import { HttpNotFoundError } from '../../../utils/errors/http.error';

class GooglePayPaymentMethodServiceMessageCode {
  public static readonly GooglePayPaymentMethod_not_found = 'GooglePayPaymentMethod_not_found';
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

  public async getGooglePayPaymentMethod(id: string): Promise<GooglePayPaymentMethodModel> {
    const GooglePayPaymentMethodEntity = await this.GooglePayPaymentMethodRepository.getGooglePayPaymentMethod(id);

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
    const GooglePayPaymentMethodEntity = await this.GooglePayPaymentMethodRepository.createGooglePayPaymentMethod(data);
    const googlePayPaymentMethodModel = new GooglePayPaymentMethodModel(GooglePayPaymentMethodEntity);

    return googlePayPaymentMethodModel;
  }

  public async updateGooglePayPaymentMethod(id: string, data: GooglePayPaymentMethodEntity): Promise<GooglePayPaymentMethodModel> {
    const GooglePayPaymentMethodEntity = await this.GooglePayPaymentMethodRepository.updateGooglePayPaymentMethod(id, data);

    if (!GooglePayPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'GooglePayPaymentMethod not found',
        msgCode: GooglePayPaymentMethodServiceMessageCode.GooglePayPaymentMethod_not_found,
      });
    }

    const googlePayPaymentMethodModel = new GooglePayPaymentMethodModel(GooglePayPaymentMethodEntity);

    return googlePayPaymentMethodModel;
  }

  public async deleteGooglePayPaymentMethod(id: string): Promise<void> {
    await this.GooglePayPaymentMethodRepository.deleteGooglePayPaymentMethod(id);
  }
}

export default GooglePayPaymentMethodService;
