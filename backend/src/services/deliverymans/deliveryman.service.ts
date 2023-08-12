import DeliverymanEntity from '../../entities/deliverymans/deliveryman.entity';
import DeliverymanModel from '../../models/deliverymans/deliveryman.model';
import DeliverymanRepository from '../../repositories/deliverymans/deliveryman.repository';
import { HttpNotFoundError, HttpForbiddenError } from '../../utils/errors/http.error';

class DeliverymanServiceMessageCode {
  public static readonly Deliveryman_not_found = 'Deliveryman_not_found';
  public static readonly Deliveryman_already_exists = 'Deliveryman_already_exists'
}

class DeliverymanService {
  private DeliverymanRepository: DeliverymanRepository;

  constructor(
    DeliverymanRepository: DeliverymanRepository,
  ) {
    this.DeliverymanRepository = DeliverymanRepository;
  }

  public async getDeliverymans(): Promise<DeliverymanModel[]> {
    const DeliverymanEntity = await this.DeliverymanRepository.getDeliverymans();

    const deliverymanModel = DeliverymanEntity.map((Deliveryman) => new DeliverymanModel(Deliveryman));

    return deliverymanModel;
  }

  public async getDeliveryman(name: string): Promise<DeliverymanModel> {
    const DeliverymanEntity = await this.DeliverymanRepository.getDeliveryman(name);

    if (!DeliverymanEntity) {
      throw new HttpNotFoundError({
        msg: 'Deliveryman not found',
        msgCode: DeliverymanServiceMessageCode.Deliveryman_not_found,
      });
    }

    const deliverymanModel = new DeliverymanModel(DeliverymanEntity);

    return deliverymanModel;
  }

  public async getDeliverymanWithoutError(name: string): Promise<DeliverymanEntity | null> {
    const DeliverymanEntity = await this.DeliverymanRepository.getDeliveryman(name);

    return DeliverymanEntity;
  }

  public async createDeliveryman(data: DeliverymanEntity): Promise<DeliverymanModel> {
    const DeliverymanEntityAlreadyExists = await this.getDeliverymanWithoutError(data.name)
    if (DeliverymanEntityAlreadyExists) {
      throw new HttpForbiddenError({
        msg: 'Deliveryman already exists',
        msgCode: DeliverymanServiceMessageCode.Deliveryman_already_exists,
      });
    }

    const DeliverymanEntity = await this.DeliverymanRepository.createDeliveryman(data);
    const deliverymanModel = new DeliverymanModel(DeliverymanEntity);

    return deliverymanModel;
  }

  public async updateDeliveryman(name: string, data: DeliverymanEntity): Promise<DeliverymanModel> {
    const DeliverymanEntity = await this.DeliverymanRepository.updateDeliveryman(name, data);

    if (!DeliverymanEntity) {
      throw new HttpNotFoundError({
        msg: 'Deliveryman not found',
        msgCode: DeliverymanServiceMessageCode.Deliveryman_not_found,
      });
    }

    const deliverymanModel = new DeliverymanModel(DeliverymanEntity);

    return deliverymanModel;
  }

  public async deleteDeliveryman(name: string): Promise<void> {
    await this.DeliverymanRepository.deleteDeliveryman(name);
  }
}

export default DeliverymanService;