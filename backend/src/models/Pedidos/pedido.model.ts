import BaseEntity from '../base.model';

export default class PedidoEntity extends BaseEntity {
  CNPJ_Restaurante: string;
  CPF_Cliente: string;
  CPF_Entregador: string;
  Data: Date;
  Endereco: string;
  id: string;
  itens: string;
  MetodoDePagamento: string;
  Observacoes: string;
  Status: string;
  ValorTotal: number;

  constructor(data: PedidoEntity) {
    super(data.id || '');
    this.CNPJ_Restaurante = data.CNPJ_Restaurante;
    this.CPF_Cliente = data.CPF_Cliente;
    this.CPF_Entregador = data.CPF_Entregador;
    this.Data = data.Data;
    this.Endereco = data.Endereco;
    this.itens = data.itens;
    this.MetodoDePagamento = data.MetodoDePagamento;
    this.Observacoes = data.Observacoes;
    this.Status = data.Status;
    this.ValorTotal = data.ValorTotal;
  }
}