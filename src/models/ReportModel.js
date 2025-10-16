// Model: Define a estrutura de dados de um Relatório
export class ReportModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.titulo = data.titulo || '';
    this.descricao = data.descricao || '';
    this.dataHora = data.dataHora || new Date().toISOString();
    this.vigilante = data.vigilante || ''; // Nome do vigilante que criou
    this.cliente = data.cliente || ''; // Nome do cliente
    this.foto = data.foto || null; // URL da foto ou null
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  // Converter para objeto simples (para salvar no Firebase)
  toJSON() {
    return {
      titulo: this.titulo,
      descricao: this.descricao,
      dataHora: this.dataHora,
      vigilante: this.vigilante,
      cliente: this.cliente,
      foto: this.foto,
      createdAt: this.createdAt
    };
  }

  // Formatar data/hora para exibição
  getFormattedDateTime() {
    const date = new Date(this.dataHora);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
