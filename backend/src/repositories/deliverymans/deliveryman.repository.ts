import DeliverymanEntity from '../../entities/deliverymans/deliveryman.entity';
import BaseRepository from '../base.repository';

class DeliverymanRepository extends BaseRepository<DeliverymanEntity> {
  constructor() {
    super('entregadores');
  }

  public async getDeliverymans(): Promise<DeliverymanEntity[]> {
    return await this.findAll();
  }

  public async getDeliveryman(name: string): Promise<DeliverymanEntity | null> {
    return await this.findOne((item) => item.name === name);
  }

  public async createDeliveryman(data: DeliverymanEntity): Promise<DeliverymanEntity> {
    return await this.add(data);
  }

  public async updateDeliveryman(
    name: string,
    data: DeliverymanEntity
  ): Promise<DeliverymanEntity | null> {
    return await this.update((item) => item.name === name, data);
  }

  public async deleteDeliveryman(name: string): Promise<void> {
    await this.delete((item) => item.name !== name);
  }
}

export default DeliverymanRepository;