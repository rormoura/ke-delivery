import CashPaymentMethodEntity from '../../../entities/payment/paymentMethods/CashPaymentMethod.entity';
import CashPaymentMethodModel from '../../../models/payment/paymentMethods/CashPaymentMethod.model';
import CashPaymentMethodRepository from '../../../repositories/payment/paymentMethods/CashPaymentMethod.repository';
import CreditCardMethodEntity from '../../../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import CreditCardPaymentMethodModel from '../../../models/payment/paymentMethods/CreditCardPaymentMethod.model';
import CreditCardPaymentMethodRepository from '../../../repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import PixPaymentMethodEntity from '../../../entities/payment/paymentMethods/PixPaymentMethod.entity';
import PixPaymentMethodModel from '../../../models/payment/paymentMethods/PixPaymentMethod.model';
import PixPaymentMethodRepository from '../../../repositories/payment/paymentMethods/PixPaymentMethod.repository';
import GooglePayPaymentMethodEntity from '../../../entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import GooglePayPaymentMethodModel from '../../../models/payment/paymentMethods/GooglePayPaymentMethod.model';
import GooglePayPaymentMethodRepository from '../../../repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import PaymentMethodsRepository from '../../../repositories/payment.base.repository';
import { HttpNotFoundError } from '../../../utils/errors/http.error';

class PaymentMethodsService {
  private cashPaymentMethodRepository: CashPaymentMethodRepository;
  private creditCardPaymentMethodRepository: CreditCardPaymentMethodRepository;
  private pixPaymentMethodRepository: PixPaymentMethodRepository;
  private googlePayPaymentMethodRepository: GooglePayPaymentMethodRepository;

  constructor(
    cashPaymentMethodRepository: CashPaymentMethodRepository,
    creditCardPaymentMethodRepository: CreditCardPaymentMethodRepository,
    pixPaymentMethodRepository: PixPaymentMethodRepository,
    googlePayPaymentMethodRepository: GooglePayPaymentMethodRepository
  ) {
    this.cashPaymentMethodRepository = cashPaymentMethodRepository;
    this.creditCardPaymentMethodRepository = creditCardPaymentMethodRepository;
    this.pixPaymentMethodRepository = pixPaymentMethodRepository;
    this.googlePayPaymentMethodRepository = googlePayPaymentMethodRepository;
  }

  public async getPaymentMethods(): Promise<any[]> {
    const CashPaymentMethodEntity = await this.cashPaymentMethodRepository.getCashPaymentMethods();
    const CreditCardPaymentMethodEntity = await this.creditCardPaymentMethodRepository.getCreditCardPaymentMethods();
    const PixPaymentMethodEntity = await this.pixPaymentMethodRepository.getPixPaymentMethods();
    const GooglePayPaymentMethodEntity = await this.googlePayPaymentMethodRepository.getGooglePayPaymentMethods();

    return CashPaymentMethodEntity.concat(CreditCardPaymentMethodEntity).concat(PixPaymentMethodEntity).concat(GooglePayPaymentMethodEntity);

  }

}
export default PaymentMethodsService;
