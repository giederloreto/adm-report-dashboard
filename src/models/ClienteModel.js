// Model: Define a estrutura de dados de um Cliente
export class ClienteModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.cidade = data.cidade || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Converter para objeto simples
  toJSON() {
    return {
      nome: this.nome,
      cidade: this.cidade,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Validar dados
  validate() {
    const errors = [];
    
    if (!this.nome || this.nome.trim() === '') {
      errors.push('Nome do cliente é obrigatório');
    }
    
    if (this.nome.length < 3) {
      errors.push('Nome deve ter no mínimo 3 caracteres');
    }
    
    if (!this.cidade || this.cidade.trim() === '') {
      errors.push('Cidade é obrigatória');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

