import CashPaymentMethodEntity from '../../../entities/payment/paymentMethods/CashPaymentMethod.entity';
import CashPaymentMethodRepository from '../../../repositories/payment/paymentMethods/CashPaymentMethod.repository';
import CreditCardPaymentMethodEntity from '../../../entities/payment/paymentMethods/CreditCardPaymentMethod.entity';
import CreditCardPaymentMethodRepository from '../../../repositories/payment/paymentMethods/CreditCardPaymentMethod.repository';
import PixPaymentMethodEntity from '../../../entities/payment/paymentMethods/PixPaymentMethod.entity';
import PixPaymentMethodRepository from '../../../repositories/payment/paymentMethods/PixPaymentMethod.repository';
import GooglePayPaymentMethodEntity from '../../../entities/payment/paymentMethods/GooglePayPaymentMethod.entity';
import GooglePayPaymentMethodRepository from '../../../repositories/payment/paymentMethods/GooglePayPaymentMethod.repository';
import { HttpNotFoundError } from '../../../utils/errors/http.error';

class PaymentMethodsServiceMessageCode {
  public static readonly PaymentMethod_not_found = 'PaymentMethod_not_found';
  public static readonly DefaultPaymentMethod_not_found = 'DefaultPaymentMethod_not_found';
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

  public async getPaymentMethod(name: string): Promise<any> {
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

    const defaultPaymentMethod = allPaymentMethods.find(paymentMethod => paymentMethod.default === "yes")

    return defaultPaymentMethod;
  }

  public async updateDefaultPaymentMethod(name: string): Promise<any>{
    const oldDefaultPaymentMethod = await this.getDefaultPaymentMethod();
    const newDefaultPaymentMethod = await this.getPaymentMethod(name);


    if(oldDefaultPaymentMethod){
      this.updatePaymentMethodDefaultAttribute(oldDefaultPaymentMethod.name, oldDefaultPaymentMethod, "no");
    }


    this.updatePaymentMethodDefaultAttribute(newDefaultPaymentMethod.name, newDefaultPaymentMethod, "yes");


    return this.getDefaultPaymentMethod();
  }


  private async updatePaymentMethodDefaultAttribute(name: string, entity: any, msg: string){
    if(!(await this.cashPaymentMethodRepository.updateCashPaymentMethod(name, new CashPaymentMethodEntity(entity, msg)))){
      if(!(await this.creditCardPaymentMethodRepository.updateCreditCardPaymentMethod(name, new CreditCardPaymentMethodEntity(entity, msg)))){
        if(!(await this.pixPaymentMethodRepository.updatePixPaymentMethod(name, new PixPaymentMethodEntity(entity, msg)))){
          await this.googlePayPaymentMethodRepository.updateGooglePayPaymentMethod(name, new GooglePayPaymentMethodEntity(entity, msg))
        }
      }
    }
  }


}
export default PaymentMethodsService;
