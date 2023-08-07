import PixPaymentMethodEntity from '../../../entities/payment/paymentMethods/PixPaymentMethod.entity';
import PixPaymentMethodModel from '../../../models/payment/paymentMethods/PixPaymentMethod.model';
import PixPaymentMethodRepository from '../../../repositories/payment/paymentMethods/PixPaymentMethod.repository';
import { HttpNotFoundError } from '../../../utils/errors/http.error';

class PixPaymentMethodServiceMessageCode {
  public static readonly PixPaymentMethod_not_found = 'PixPaymentMethod_not_found';
}

class PixPaymentMethodService {
  private PixPaymentMethodRepository: PixPaymentMethodRepository;

  constructor(
    PixPaymentMethodRepository: PixPaymentMethodRepository,
  ) {
    this.PixPaymentMethodRepository = PixPaymentMethodRepository;
  }

  public async getPixPaymentMethods(): Promise<PixPaymentMethodModel[]> {
    const PixPaymentMethodEntity = await this.PixPaymentMethodRepository.getPixPaymentMethods();

    const pixPaymentMethodModel = PixPaymentMethodEntity.map((PixPaymentMethod) => new PixPaymentMethodModel(PixPaymentMethod));

    return pixPaymentMethodModel;
  }

  public async getPixPaymentMethod(name: string): Promise<PixPaymentMethodModel> {
    const PixPaymentMethodEntity = await this.PixPaymentMethodRepository.getPixPaymentMethod(name);

    if (!PixPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'PixPaymentMethod not found',
        msgCode: PixPaymentMethodServiceMessageCode.PixPaymentMethod_not_found,
      });
    }

    const pixPaymentMethodModel = new PixPaymentMethodModel(PixPaymentMethodEntity);

    return pixPaymentMethodModel;
  }

  public async createPixPaymentMethod(data: PixPaymentMethodEntity): Promise<PixPaymentMethodModel> {
    const PixPaymentMethodEntity = await this.PixPaymentMethodRepository.createPixPaymentMethod(data);
    const pixPaymentMethodModel = new PixPaymentMethodModel(PixPaymentMethodEntity);

    return pixPaymentMethodModel;
  }

  public async updatePixPaymentMethod(name: string, data: PixPaymentMethodEntity): Promise<PixPaymentMethodModel> {
    const PixPaymentMethodEntity = await this.PixPaymentMethodRepository.updatePixPaymentMethod(name, data);

    if (!PixPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'PixPaymentMethod not found',
        msgCode: PixPaymentMethodServiceMessageCode.PixPaymentMethod_not_found,
      });
    }

    const pixPaymentMethodModel = new PixPaymentMethodModel(PixPaymentMethodEntity);

    return pixPaymentMethodModel;
  }

  public async deletePixPaymentMethod(name: string): Promise<void> {
    await this.PixPaymentMethodRepository.deletePixPaymentMethod(name);
  }
}

export default PixPaymentMethodService;
