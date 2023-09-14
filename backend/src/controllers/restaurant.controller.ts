import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import RestaurantService from '../services/restaurant.service';
import RestaurantEntity from '../entities/restaurant.entity';
import { HttpError, HttpInternalServerError } from '../utils/errors/http.error';

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
    this.router.post(`${this.prefix}/login`, (req: Request, res: Response) =>
      this.handleRequest(() => this.restaurantService.loginRestaurant(req.body.email , req.body.password), req, res)
    ); 
    this.router.get(this.prefix, (req: Request, res: Response) => 
      this.handleRequest(()=>this.restaurantService.getRestaurants(), req, res)
    );
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) => 
      this.handleRequest(()=>this.restaurantService.getRestaurant(req.params.id), req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.handleRequest(()=>this.restaurantService.createRestaurant(new RestaurantEntity(req.body)), req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.handleRequest(()=>this.restaurantService.updateRestaurant(req.params.id, new RestaurantEntity(req.body)), req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.handleRequest(()=>this.restaurantService.deleteRestaurant(req.params.id), req, res)
    );
  }

  private async handleRequest(action: () => Promise<any>, req: Request, res: Response) {
    try {
      const result = await action();
      new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: result,
      }).handle(res);
    } catch (error) {
      if (error instanceof HttpError) {
        error.handle(res);
      } else {
        const unknownError: unknown = error;
        if (unknownError instanceof Error) {
          new HttpInternalServerError({
            msg: unknownError.message,
            msgCode: 'internal_server_error',
          }).handle(res);
        } else {
          res.status(500).json({ error: 'Erro interno do servidor' });
        }
      }
    }
  }

  // private async getRestaurants(req: Request, res: Response) {
  //   const restaurants = await this.restaurantService.getRestaurants();

  //   return new SuccessResult({
  //     code: 200,
  //     msg: Result.transformRequestOnMsg(req),
  //     data: restaurants,
  //   }).handle(res);
  // }
  
  // private async getRestaurant(req: Request, res: Response) {
  //   const restaurant = await this.restaurantService.getRestaurant(req.params.id);

  //   return new SuccessResult({
  //     code: 200,
  //     msg: Result.transformRequestOnMsg(req),
  //     data: restaurant,
  //   }).handle(res);
  // }

  // private async createRestaurant(req: Request, res: Response) {
  //   const restaurant = await this.restaurantService.createRestaurant(new RestaurantEntity(req.body));

  //   // colocar regra para criação de conta
  //   return new SuccessResult({
  //     code: 200,
  //     msg: Result.transformRequestOnMsg(req),
  //     data: restaurant,
  //   }).handle(res);
  // }

  // private async updateRestaurant(req: Request, res: Response) {
  //   const restaurant = await this.restaurantService.updateRestaurant(
  //     req.params.id,
  //     new RestaurantEntity(req.body)
  //   )

  //   return new SuccessResult({
  //     code: 200,
  //     msg: Result.transformRequestOnMsg(req),
  //     data: restaurant,
  //   }).handle(res);
  // }

  // private async deleteRestaurant(req: Request, res: Response) {
  //   await this.restaurantService.deleteRestaurant(req.params.id);

  //   return new SuccessResult({
  //     code: 200,
  //     msg: Result.transformRequestOnMsg(req),
  //   }).handle(res);
  // }
}

export default RestaurantController;