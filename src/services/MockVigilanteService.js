// Mock Service - CRUD de Vigilantes
import { VigilanteModel } from '../models/VigilanteModel';

let mockDatabase = [
  {
    id: '1',
    nome: 'João Silva',
    createdAt: '2024-10-01T08:00:00.000Z',
    updatedAt: '2024-10-01T08:00:00.000Z'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    createdAt: '2024-10-02T08:00:00.000Z',
    updatedAt: '2024-10-02T08:00:00.000Z'
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    createdAt: '2024-10-03T08:00:00.000Z',
    updatedAt: '2024-10-03T08:00:00.000Z'
  }
];

let nextId = 4;

export class MockVigilanteService {
  static async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // CREATE
  static async create(data) {
    await this.delay();
    
    try {
      const vigilante = new VigilanteModel(data);
      const validation = vigilante.validate();
      
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const newVigilante = {
        id: String(nextId++),
        ...vigilante.toJSON()
      };

      mockDatabase.push(newVigilante);
      return { success: true, id: newVigilante.id, message: 'Vigilante criado com sucesso!' };
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
      const vigilante = mockDatabase.find(v => v.id === id);
      
      if (vigilante) {
        return { success: true, data: vigilante };
      } else {
        return { success: false, error: 'Vigilante não encontrado' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // UPDATE
  static async update(id, data) {
    await this.delay();
    
    try {
      const index = mockDatabase.findIndex(v => v.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Vigilante não encontrado' };
      }

      const vigilante = new VigilanteModel(data);
      const validation = vigilante.validate();
      
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      mockDatabase[index] = {
        ...mockDatabase[index],
        nome: data.nome,
        updatedAt: new Date().toISOString()
      };

      return { success: true, message: 'Vigilante atualizado com sucesso!' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // DELETE
  static async delete(id) {
    await this.delay();
    
    try {
      const index = mockDatabase.findIndex(v => v.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Vigilante não encontrado' };
      }

      mockDatabase.splice(index, 1);
      return { success: true, message: 'Vigilante deletado com sucesso!' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

