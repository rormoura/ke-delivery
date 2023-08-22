import BaseEntity from '../base.entity';

export default class PedidoEntity extends BaseEntity {
  CNPJ_Restaurante: string;
  CPF_Cliente: string;
  CPF_Entregador: string;
  Data: Date;
  Endereco: string;
  name: string;
  Itens: string;
  MetodoDePagamento: string;
  Observacoes: string;
  Status: string;
  ValorTotal: number;

  constructor(data: PedidoEntity) {
    super(data.id || '');
    this.name = data.name;
    this.CNPJ_Restaurante = data.CNPJ_Restaurante;
    this.CPF_Cliente = data.CPF_Cliente;
    this.CPF_Entregador = data.CPF_Entregador;
    this.Data = data.Data;
    this.Endereco = data.Endereco;
    this.Itens = data.Itens;
    this.MetodoDePagamento = data.MetodoDePagamento;
    this.Observacoes = data.Observacoes;
    this.Status = data.Status;
    this.ValorTotal = data.ValorTotal;   
  }
}