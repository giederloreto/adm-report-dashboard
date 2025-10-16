// Mock Service - CRUD de Clientes
import { ClienteModel } from '../models/ClienteModel';

let mockDatabase = [
  {
    id: '1',
    nome: 'Empresa ABC Ltda',
    cidade: 'São Paulo',
    createdAt: '2024-10-01T08:00:00.000Z',
    updatedAt: '2024-10-01T08:00:00.000Z'
  },
  {
    id: '2',
    nome: 'Condomínio XYZ',
    cidade: 'Rio de Janeiro',
    createdAt: '2024-10-02T08:00:00.000Z',
    updatedAt: '2024-10-02T08:00:00.000Z'
  },
  {
    id: '3',
    nome: 'Edifício Comercial Centro',
    cidade: 'São Paulo',
    createdAt: '2024-10-03T08:00:00.000Z',
    updatedAt: '2024-10-03T08:00:00.000Z'
  },
  {
    id: '4',
    nome: 'Shopping Center Plaza',
    cidade: 'Belo Horizonte',
    createdAt: '2024-10-04T08:00:00.000Z',
    updatedAt: '2024-10-04T08:00:00.000Z'
  }
];

let nextId = 5;

export class MockClienteService {
  static async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // CREATE
  static async create(data) {
    await this.delay();
    
    try {
      const cliente = new ClienteModel(data);
      const validation = cliente.validate();
      
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const newCliente = {
        id: String(nextId++),
        ...cliente.toJSON()
      };

      mockDatabase.push(newCliente);
      return { success: true, id: newCliente.id, message: 'Cliente criado com sucesso!' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // READ ALL
  static async getAll() {
    await this.delay();
    
    try {
      const sorted = [...mockDatabase].sort((a, b) => a.nome.localeCompare(b.nome));
      return { success: true, data: sorted };
    } catch (error) {
      return { success: false, error: error.message, data: [] };
    }
  }

  // READ BY ID
  static async getById(id) {
    await this.delay();
    
    try {
      const cliente = mockDatabase.find(c => c.id === id);
      
      if (cliente) {
        return { success: true, data: cliente };
      } else {
        return { success: false, error: 'Cliente não encontrado' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // UPDATE
  static async update(id, data) {
    await this.delay();
    
    try {
      const index = mockDatabase.findIndex(c => c.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Cliente não encontrado' };
      }

      const cliente = new ClienteModel(data);
      const validation = cliente.validate();
      
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      mockDatabase[index] = {
        ...mockDatabase[index],
        nome: data.nome,
        cidade: data.cidade,
        updatedAt: new Date().toISOString()
      };

      return { success: true, message: 'Cliente atualizado com sucesso!' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // DELETE
  static async delete(id) {
    await this.delay();
    
    try {
      const index = mockDatabase.findIndex(c => c.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Cliente não encontrado' };
      }

      mockDatabase.splice(index, 1);
      return { success: true, message: 'Cliente deletado com sucesso!' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

