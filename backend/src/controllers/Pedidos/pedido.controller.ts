import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../../utils/result';
import PedidoService from '../../services/Pedidos/pedido.service';
import PedidoEntity from '../../entities/Pedidos/pedido.entity';

class PedidoController {
  private prefix: string = '/pedidos';
  public router: Router;
  private pedidoService: PedidoService;

  constructor(router: Router, pedidoService: PedidoService) {
    this.router = router;
    this.pedidoService = pedidoService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getPedidos(req, res)
    );

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getPedido(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createPedido(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updatePedido(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deletePedido(req, res)
    );
  }

  private async getPedidos(req: Request, res: Response) {
    const pedidos = await this.pedidoService.getPedidos();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: pedidos,
    }).handle(res);
  }

  private async getPedido(req: Request, res: Response) {
    const pedido = await this.pedidoService.getPedido(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: pedido,
    }).handle(res);
  }

  private async createPedido(req: Request, res: Response) {
    const pedido = await this.pedidoService.createPedido(new PedidoEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: pedido,
    }).handle(res);
  }

  private async updatePedido(req: Request, res: Response) {
    const pedido = await this.pedidoService.updatePedido(
      req.params.id,
      new PedidoEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: pedido,
    }).handle(res);
  }

  private async deletePedido(req: Request, res: Response) {
    await this.pedidoService.deletePedido(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default PedidoController;