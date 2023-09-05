import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../utils/result';
import MenuService from '../../services/menu/menu.service';
import MenuEntity from '../../entities/menu/menu.entity';

class MenuController {
    private prefix: string = '/menu';
    public router: Router;
    private MenuService: MenuService;
  
    constructor(router: Router, MenuService: MenuService) {
      this.router = router;
      this.MenuService = MenuService;
      this.initRoutes();
    }
  
    private initRoutes() {
      this.router.get(this.prefix, (req: Request, res: Response) =>
        this.getMenu(req, res)
      );
  
      this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
        this.getMenuItem(req, res)
      );
      this.router.post(this.prefix, (req: Request, res: Response) =>
        this.createMenu(req, res)
      );
      this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
        this.updateMenu(req, res)
      );
      this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
        this.deleteMenu(req, res)
      );
    }
    private async getMenu(req: Request, res: Response) {
      const test = await this.MenuService.getMenu();
  
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: test,
      }).handle(res);
    }
  
    private async getMenuItem(req: Request, res: Response) {
      const test = await this.MenuService.getMenuItem(req.params.id);
  
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: test,
      }).handle(res);
    }
  
    private async createMenu(req: Request, res: Response) {
      const test = await this.MenuService.createMenu(new MenuEntity(req.body));
  
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: test,
      }).handle(res);
    }
  
    private async updateMenu(req: Request, res: Response) {
      const test = await this.MenuService.updateMenu(
        req.params.id,
        new MenuEntity(req.body)
      );
  
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: test,
      }).handle(res);
    }
  
    private async deleteMenu(req: Request, res: Response) {
      await this.MenuService.deleteMenu(req.params.id);
  
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
      }).handle(res);
    }
  }
  
  export default MenuController;
  