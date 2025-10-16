// Mock Service - Simula Firebase para desenvolvimento local
import { ReportModel } from '../models/ReportModel';

// Simulação de banco de dados local com novos dados
let mockDatabase = [
  {
    id: '1',
    titulo: 'Ronda Noturna - Setor A',
    descricao: 'Ronda realizada no setor A durante o turno noturno. Todas as áreas verificadas, portas e janelas verificadas. Nenhuma irregularidade encontrada.',
    dataHora: '2025-10-16T22:30:00',
    vigilante: 'João Silva',
    cliente: 'Empresa ABC Ltda',
    foto: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400',
    createdAt: '2025-10-16T22:45:00.000Z'
  },
  {
    id: '2',
    titulo: 'Incidente - Tentativa de Acesso',
    descricao: 'Detectada tentativa de acesso não autorizado no portão lateral às 03:15. Indivíduo foi abordado e identificado. Polícia acionada. Situação controlada.',
    dataHora: '2025-10-16T03:15:00',
    vigilante: 'Maria Santos',
    cliente: 'Condomínio XYZ',
    foto: null,
    createdAt: '2025-10-16T03:30:00.000Z'
  },
  {
    id: '3',
    titulo: 'Recebimento de Entregas',
    descricao: 'Recebidas 3 entregas durante o período da manhã. Todos os pacotes conferidos e registrados no sistema. Destinatários notificados.',
    dataHora: '2025-10-15T09:20:00',
    vigilante: 'Pedro Costa',
    cliente: 'Edifício Comercial Centro',
    foto: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400',
    createdAt: '2025-10-15T09:30:00.000Z'
  },
  {
    id: '4',
    titulo: 'Vistoria Mensal - Equipamentos',
    descricao: 'Realizada vistoria mensal de todos os equipamentos de segurança. Câmeras funcionando corretamente, alarmes testados, extintores dentro do prazo de validade.',
    dataHora: '2025-10-14T14:00:00',
    vigilante: 'João Silva',
    cliente: 'Shopping Center Plaza',
    foto: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400',
    createdAt: '2025-10-14T15:00:00.000Z'
  },
  {
    id: '5',
    titulo: 'Ronda Diurna - Estacionamento',
    descricao: 'Verificação completa do estacionamento. 47 veículos registrados. Nenhuma ocorrência. Todas as vagas sinalizadas corretamente.',
    dataHora: '2025-10-16T14:30:00',
    vigilante: 'Maria Santos',
    cliente: 'Empresa ABC Ltda',
    foto: null,
    createdAt: '2025-10-16T14:45:00.000Z'
  }
];

let nextId = 6;

export class MockReportService {
  // Simula delay de rede
  static async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // READ ALL - Buscar todos os relatórios
  static async getAllReports() {
    await this.delay();
    
    try {
      // Ordena por data/hora decrescente (mais recente primeiro)
      const sortedReports = [...mockDatabase].sort((a, b) => {
        return new Date(b.dataHora) - new Date(a.dataHora);
      });
      
      return { success: true, data: sortedReports };
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      return { success: false, error: error.message, data: [] };
    }
  }

  // READ BY ID - Buscar relatório por ID
  static async getReportById(id) {
    await this.delay();
    
    try {
      const report = mockDatabase.find(r => r.id === id);
      
      if (report) {
        return { success: true, data: report };
      } else {
        return { success: false, error: 'Relatório não encontrado' };
      }
    } catch (error) {
      console.error('Erro ao buscar relatório:', error);
      return { success: false, error: error.message };
    }
  }

  // DELETE - Deletar relatório (apenas para admin)
  static async deleteReport(id) {
    await this.delay();
    
    try {
      const index = mockDatabase.findIndex(r => r.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Relatório não encontrado' };
      }

      mockDatabase.splice(index, 1);
      return { success: true, message: 'Relatório deletado com sucesso!' };
    } catch (error) {
      console.error('Erro ao deletar relatório:', error);
      return { success: false, error: error.message };
    }
  }

  // Estatísticas do dashboard
  static getStatistics(reports) {
    const total = reports.length;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const hoje24h = reports.filter(r => {
      const reportDate = new Date(r.dataHora);
      return reportDate >= hoje;
    }).length;
    
    const comFoto = reports.filter(r => r.foto && r.foto !== null).length;
    
    // Contar relatórios únicos por cliente
    const clientes = new Set(reports.map(r => r.cliente)).size;
    
    // Contar relatórios únicos por vigilante
    const vigilantes = new Set(reports.map(r => r.vigilante)).size;
    
    return {
      total,
      hoje: hoje24h,
      comFoto,
      clientes,
      vigilantes
    };
  }
}
