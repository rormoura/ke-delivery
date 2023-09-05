import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import RestaurantService from '../services/restaurant.service';
import RestaurantEntity from '../entities/restaurant.entity';
import RestaurantRepository from '../repositories/restaurant.repository';

class RestaurantController {
  private prefix: string = '/restaurants';
  public router: Router;
  private restaurantService: RestaurantService;

  constructor(router: Router, restaurantService: RestaurantService) {
    this.router = router;
    this.restaurantService = restaurantService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) => 
      this.getRestaurants(req, res)
    );
    this.router.get(this.prefix, (req: Request, res: Response) => 
      this.getRestaurant(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createRestaurant(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateRestaurant(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteRestaurant(req, res)
    );
  }

  private async getRestaurants(req: Request, res: Response) {
    const restaurants = await this.restaurantService.getRestaurants();

    return new SuccessResult({
      code: 200,
      msg: Result.transformRequestOnMsg(req),
      data: restaurants,
    }).handle(res);
  }
  
  private async getRestaurant(req: Request, res: Response) {
    const restaurant = await this.restaurantService.getRestaurant(req.params.id);

    return new SuccessResult({
      code: 200,
      msg: Result.transformRequestOnMsg(req),
      data: restaurant,
    }).handle(res);
  }

  private async createRestaurant(req: Request, res: Response) {
    const restaurant = await this.restaurantService.createRestaurant(new RestaurantEntity(req.body));

    // colocar regra para criação de conta
    return new SuccessResult({
      code: 200,
      msg: Result.transformRequestOnMsg(req),
      data: restaurant,
    }).handle(res);
  }

  private async updateRestaurant(req: Request, res: Response) {
    const restaurant = await this.restaurantService.updateRestaurant(
      req.params.id,
      new RestaurantEntity(req.body)
    )

    return new SuccessResult({
      code: 200,
      msg: Result.transformRequestOnMsg(req),
      data: restaurant,
    }).handle(res);
  }

  private async deleteRestaurant(req: Request, res: Response) {
    await this.restaurantService.deleteRestaurant(req.params.id);

    return new SuccessResult({
      code: 200,
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default RestaurantController;