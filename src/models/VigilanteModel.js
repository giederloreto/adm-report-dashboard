// Model: Define a estrutura de dados de um Vigilante
export class VigilanteModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Converter para objeto simples
  toJSON() {
    return {
      nome: this.nome,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Validar dados
  validate() {
    const errors = [];
    
    if (!this.nome || this.nome.trim() === '') {
      errors.push('Nome do vigilante é obrigatório');
    }
    
    if (this.nome.length < 3) {
      errors.push('Nome deve ter no mínimo 3 caracteres');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

