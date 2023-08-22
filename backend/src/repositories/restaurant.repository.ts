import RegisterRestaurantEntity from '../entities/restaurant.entity';
import BaseRepository from './base.repository';

class RestaurantRepository extends BaseRepository<RegisterRestaurantEntity> {
  constructor() {
    super('restaurants');
  }

  public async getRestaurants(): Promise<RegisterRestaurantEntity[]> {
    return await this.findAll();
  }

  public async getRestaurant(id: string): Promise<RegisterRestaurantEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createRestaurant(data: RegisterRestaurantEntity): Promise<RegisterRestaurantEntity> {
    return await this.add(data);
  }

  public async updateRestaurant(
    id: string,
    data: RegisterRestaurantEntity
  ): Promise<RegisterRestaurantEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteRestaurant(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default RestaurantRepository;
