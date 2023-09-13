import BaseEntity from '../base.model';

export default class PedidoEntity extends BaseEntity {
  IdRestaurante: string;
  IdCliente: string;
  IdEntregador: string;
  Data: Date;
  Endereco: string;
  Itens: string;
  MetodoDePagamento: string;
  Observacoes: string;
  Status: string;
  ValorTotal: number;

  constructor(data: PedidoEntity) {
    super(data.id || '');
    this.IdRestaurante = data.IdRestaurante;
    this.IdCliente = data.IdCliente;
    this.IdEntregador = data.IdEntregador;
    this.Data = data.Data;
    this.Endereco = data.Endereco;
    this.Itens = data.Itens;
    this.MetodoDePagamento = data.MetodoDePagamento;
    this.Observacoes = data.Observacoes;
    this.Status = data.Status;
    this.ValorTotal = data.ValorTotal;   
  }
}

