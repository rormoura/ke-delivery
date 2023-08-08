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

class PaymentMethodsServiceMessageCode {
  public static readonly PaymentMethod_not_found = 'PaymentMethod_not_found';
}

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

  public async getPaymentMethod(name: string): Promise<any | null> {
    const cashPaymentMethod = await this.cashPaymentMethodRepository.getCashPaymentMethod(name)
    const creditCardPaymentMethod = await this.creditCardPaymentMethodRepository.getCreditCardPaymentMethod(name)
    const pixPaymentMethod = await this.pixPaymentMethodRepository.getPixPaymentMethod(name)
    const googlePayPaymentMethod = await this.googlePayPaymentMethodRepository.getGooglePayPaymentMethod(name)

    if(cashPaymentMethod){
      return cashPaymentMethod;
    }
    else if (creditCardPaymentMethod){
      return creditCardPaymentMethod;
    }
    else if(pixPaymentMethod){
      return pixPaymentMethod;
    }
    else if(googlePayPaymentMethod){
      return googlePayPaymentMethod;
    }

    throw new HttpNotFoundError({
      msg: 'There is no '+name+' payment method',
      msgCode: PaymentMethodsServiceMessageCode.PaymentMethod_not_found,
    });

  }

  public async getDefaultPaymentMethod(): Promise<any | null> {
    const allPaymentMethods = await this.getPaymentMethods();

    return allPaymentMethods.find(paymentMethod => paymentMethod.default === "yes");
  }

  private async getPaymentMethodType(name: string): Promise<string> {
    let paymentMethodType = 'cash'

    if(!(await this.cashPaymentMethodRepository.getCashPaymentMethod(name))){
      paymentMethodType = 'creditCard'
      if(!(await this.creditCardPaymentMethodRepository.getCreditCardPaymentMethod(name))){
        paymentMethodType = 'pix'
        if(!(await this.pixPaymentMethodRepository.getPixPaymentMethod(name))){
          paymentMethodType = 'googlePay'
          if(!(await this.googlePayPaymentMethodRepository.getGooglePayPaymentMethod(name))){
            paymentMethodType = 'none'
          }
        }
      }
    }

    return paymentMethodType;

  }

  public async updateDefaultPaymentMethod(name: string): Promise<any>{
    const oldDefaultPaymentMethod = await this.getDefaultPaymentMethod();
    const newDefaultPaymentMethod = await this.getPaymentMethod(name);
    newDefaultPaymentMethod.default = "yes"
    oldDefaultPaymentMethod.default = "no"

    if(!(await this.cashPaymentMethodRepository.updateCashPaymentMethod(newDefaultPaymentMethod.name, newDefaultPaymentMethod))){
      if(!(await this.creditCardPaymentMethodRepository.updateCreditCardPaymentMethod(newDefaultPaymentMethod.name, newDefaultPaymentMethod))){
        if(!(await this.pixPaymentMethodRepository.updatePixPaymentMethod(newDefaultPaymentMethod.name, newDefaultPaymentMethod))){
          await this.googlePayPaymentMethodRepository.updateGooglePayPaymentMethod(newDefaultPaymentMethod.name, newDefaultPaymentMethod)
        }
      }
    }

    if(!(await this.cashPaymentMethodRepository.updateCashPaymentMethod(oldDefaultPaymentMethod.name, oldDefaultPaymentMethod))){
      if(!(await this.creditCardPaymentMethodRepository.updateCreditCardPaymentMethod(oldDefaultPaymentMethod.name, oldDefaultPaymentMethod))){
        if(!(await this.pixPaymentMethodRepository.updatePixPaymentMethod(oldDefaultPaymentMethod.name, oldDefaultPaymentMethod))){
          await this.googlePayPaymentMethodRepository.updateGooglePayPaymentMethod(oldDefaultPaymentMethod.name, oldDefaultPaymentMethod)
        }
      }
    }

    return newDefaultPaymentMethod;
  }

}
export default PaymentMethodsService;
