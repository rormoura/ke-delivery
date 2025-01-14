import PedidoEntity from '../../entities/Pedidos/pedido.entity';
import PedidoModel from '../../models/Pedidos/pedido.model';
import PedidoRepository from '../../repositories/Pedidos/pedido.repository';
import { HttpNotFoundError, HttpForbiddenError } from '../../utils/errors/http.error';

class PedidoService {

  nFound = 'Pedido not found';
  aExist = 'Pedido already exists';

  private PedidoRepository: PedidoRepository;

  constructor(
    PedidoRepository: PedidoRepository,
  ) {
    this.PedidoRepository = PedidoRepository;
  }

  public async getPedidos(): Promise<PedidoModel[]> {
    const PedidoEntity = await this.PedidoRepository.getPedidos();

    const pedidoModel = PedidoEntity.map((Pedido) => new PedidoModel(Pedido));

    return pedidoModel;
  }

  public async getPedido(id: string): Promise<PedidoModel> {
    const PedidoEntity = await this.PedidoRepository.getPedido(id);

    if (!PedidoEntity) {
      throw new HttpNotFoundError({
        msg: this.nFound,
        msgCode: this.nFound,
      });
    }

    const pedidoModel = new PedidoModel(PedidoEntity);

    return pedidoModel;
  }

  public async getPedidoWithoutError(id: string): Promise<PedidoEntity | null> {
    const PedidoEntity = await this.PedidoRepository.getPedido(id);

    return PedidoEntity;
  }

  public async createPedido(data: PedidoEntity): Promise<PedidoModel> {
    const PedidoEntityAlreadyExists = await this.getPedidoWithoutError(data.id)
    if (PedidoEntityAlreadyExists) {
      throw new HttpForbiddenError({
        msg: this.aExist,
        msgCode: this.aExist,
      });
    }

    const PedidoEntity = await this.PedidoRepository.createPedido(data);
    const pedidoModel = new PedidoModel(PedidoEntity);

    return pedidoModel;
  }

  public async updatePedido(id: string, data: PedidoEntity): Promise<PedidoModel> {
    const PedidoEntity = await this.PedidoRepository.updatePedido(id, data);

    if (!PedidoEntity) {
      throw new HttpNotFoundError({
        msg: this.nFound,
        msgCode: this.nFound,
      });
    }

    const pedidoModel = new PedidoModel(PedidoEntity);

    return pedidoModel;
  }

  public async deletePedido(id: string): Promise<void> {
    await this.PedidoRepository.deletePedido(id);
  }
}

export default PedidoService;