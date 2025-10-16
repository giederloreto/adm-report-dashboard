// Service/Controller: Gerencia operações de leitura no Firebase
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { ReportModel } from '../models/ReportModel';

const COLLECTION_NAME = 'reports';

export class ReportService {
  // READ - Buscar todos os relatórios
  static async getAllReports() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('dataHora', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const reports = [];
      querySnapshot.forEach((doc) => {
        reports.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return { success: true, data: reports };
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      return { success: false, error: error.message, data: [] };
    }
  }

  // READ - Buscar relatório por ID
  static async getReportById(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { 
          success: true, 
          data: { id: docSnap.id, ...docSnap.data() } 
        };
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
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
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
    
    return {
      total,
      hoje: hoje24h,
      comFoto,
      clientes
    };
  }
}
