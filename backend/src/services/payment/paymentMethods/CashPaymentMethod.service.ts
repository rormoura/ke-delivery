import CashPaymentMethodEntity from '../../../entities/payment/paymentMethods/CashPaymentMethod.entity';
import CashPaymentMethodModel from '../../../models/payment/paymentMethods/CashPaymentMethod.model';
import CashPaymentMethodRepository from '../../../repositories/payment/paymentMethods/CashPaymentMethod.repository';
import { HttpNotFoundError } from '../../../utils/errors/http.error';

class CashPaymentMethodServiceMessageCode {
  public static readonly CashPaymentMethod_not_found = 'CashPaymentMethod_not_found';
}

class CashPaymentMethodService {
  private CashPaymentMethodRepository: CashPaymentMethodRepository;

  constructor(
    CashPaymentMethodRepository: CashPaymentMethodRepository,
  ) {
    this.CashPaymentMethodRepository = CashPaymentMethodRepository;
  }

  public async getCashPaymentMethods(): Promise<CashPaymentMethodModel[]> {
    const CashPaymentMethodEntity = await this.CashPaymentMethodRepository.getCashPaymentMethods();

    const cashPaymentMethodModel = CashPaymentMethodEntity.map((CashPaymentMethod) => new CashPaymentMethodModel(CashPaymentMethod));

    return cashPaymentMethodModel;
  }

  public async getCashPaymentMethod(id: string): Promise<CashPaymentMethodModel> {
    const CashPaymentMethodEntity = await this.CashPaymentMethodRepository.getCashPaymentMethod(id);

    if (!CashPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'CashPaymentMethod not found',
        msgCode: CashPaymentMethodServiceMessageCode.CashPaymentMethod_not_found,
      });
    }

    const cashPaymentMethodModel = new CashPaymentMethodModel(CashPaymentMethodEntity);

    return cashPaymentMethodModel;
  }

  public async createCashPaymentMethod(data: CashPaymentMethodEntity): Promise<CashPaymentMethodModel> {
    const CashPaymentMethodEntity = await this.CashPaymentMethodRepository.createCashPaymentMethod(data);
    const cashPaymentMethodModel = new CashPaymentMethodModel(CashPaymentMethodEntity);

    return cashPaymentMethodModel;
  }

  public async updateCashPaymentMethod(id: string, data: CashPaymentMethodEntity): Promise<CashPaymentMethodModel> {
    const CashPaymentMethodEntity = await this.CashPaymentMethodRepository.updateCashPaymentMethod(id, data);

    if (!CashPaymentMethodEntity) {
      throw new HttpNotFoundError({
        msg: 'CashPaymentMethod not found',
        msgCode: CashPaymentMethodServiceMessageCode.CashPaymentMethod_not_found,
      });
    }

    const cashPaymentMethodModel = new CashPaymentMethodModel(CashPaymentMethodEntity);

    return cashPaymentMethodModel;
  }

  public async deleteCashPaymentMethod(id: string): Promise<void> {
    await this.CashPaymentMethodRepository.deleteCashPaymentMethod(id);
  }
}

export default CashPaymentMethodService;
