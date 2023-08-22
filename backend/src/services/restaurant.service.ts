import RestaurantEntity from '../entities/restaurant.entity';
import RestaurantModel from '../models/restaurant.model';
import OtherRepository from '../repositories/other.repository';
import RestaurantRepository from '../repositories/restaurant.repository';
import { HttpForbiddenError, HttpNotFoundError } from '../utils/errors/http.error';

class RestaurantServiceMessageCode {
  public static readonly account_not_found = 'account_not_found';
  public static readonly restaurant_already_exists = 'restaurant_already_exists';
}

class RestaurantService {
  private restaurantRepository: RestaurantRepository;

  constructor(
    restaurantRepository: RestaurantRepository
  ) {
    this.restaurantRepository = restaurantRepository
  }

  public async getRestaurants(): Promise<RestaurantModel[]> {
    const restaurantsEntity = await this.restaurantRepository.getRestaurants();

    const restaurantsModel = restaurantsEntity.map((RestaurantEntity) => new RestaurantModel(RestaurantEntity));

    return restaurantsModel;
  }

  public async getRestaurant(id: string): Promise<RestaurantModel> {
    const restaurantEntity = await this.restaurantRepository.getRestaurant(id);

    if (!restaurantEntity) {
      throw new HttpNotFoundError({
        msg: 'Account not found',
        msgCode: RestaurantServiceMessageCode.account_not_found,
      });
    }

    const restaurantModel = new RestaurantModel(restaurantEntity);

    return restaurantModel;
  }
  
  public async getRestaurantWithoutError(CNPJ: string): Promise<RestaurantEntity | null> {
    const RestaurantEntity = await this.restaurantRepository.getRestaurant(CNPJ)

    return RestaurantEntity;
  }

  public async createRestaurant(data: RestaurantEntity): Promise<RestaurantModel> {
    const RestaurantAlreadyExists = await this.getRestaurantWithoutError(data.CNPJ)
    
    if(RestaurantAlreadyExists) {
      throw new HttpForbiddenError({
        msg: 'Restaurant already exists',
        msgCode:RestaurantServiceMessageCode.restaurant_already_exists,
      })
    }

    const restaurantEntity = await this.restaurantRepository.createRestaurant(data);
    const restaurantModel = new RestaurantModel(restaurantEntity);

    return restaurantModel;
  }

  public async updateRestaurant(id: string, data: RestaurantEntity): Promise<RestaurantModel> {
    const restaurantEntity = await this.restaurantRepository.updateRestaurant(id, data);

    if (!restaurantEntity) {
      throw new HttpNotFoundError({
        msg: 'Account not found',
        msgCode: RestaurantServiceMessageCode.account_not_found,
      });
    }

    const restaurantModel = new RestaurantModel(restaurantEntity);

    return restaurantModel;
  }

  public async deleteRestaurant(id: string): Promise<void> {
    await this.restaurantRepository.deleteRestaurant(id);
  }
}

export default RestaurantService;