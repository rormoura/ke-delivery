import DeliverymanEntity from '../../entities/deliverymans/deliveryman.entity';
import BaseRepository from '../base.repository';

class DeliverymanRepository extends BaseRepository<DeliverymanEntity> {
  constructor() {
    super('entregadores');
  }

  public async getDeliverymans(): Promise<DeliverymanEntity[]> {
    return await this.findAll();
  }

  public async getDeliveryman(id: string): Promise<DeliverymanEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createDeliveryman(data: DeliverymanEntity): Promise<DeliverymanEntity> {
    return await this.add(data);
  }

  public async updateDeliveryman(
    id: string,
    data: DeliverymanEntity
  ): Promise<DeliverymanEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteDeliveryman(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default DeliverymanRepository;