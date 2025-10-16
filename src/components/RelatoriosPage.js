// View: Página de Relatórios (antiga Dashboard)
import React, { useState, useEffect, useCallback } from 'react';
import { MockReportService as ReportService } from '../services/MockReportService';
import ReportList from './ReportList';
import Statistics from './Statistics';
import ReportFilters from './ReportFilters';
import DashboardCharts from './DashboardCharts';
import './RelatoriosPage.css';

function RelatoriosPage() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [statistics, setStatistics] = useState({ 
    total: 0, 
    hoje: 0, 
    comFoto: 0, 
    clientes: 0,
    vigilantes: 0 
  });
  const [filters, setFilters] = useState({
    data: '',
    vigilante: '',
    cliente: ''
  });
  const [vigilantesList, setVigilantesList] = useState([]);
  const [clientesList, setClientesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [showCharts, setShowCharts] = useState(true);

  const loadReports = useCallback(async () => {
    setLoading(true);
    const result = await ReportService.getAllReports();
    if (result.success) {
      setReports(result.data);
      setFilteredReports(result.data);
      
      // Extrair listas únicas de vigilantes e clientes
      const vigilantes = [...new Set(result.data.map(r => r.vigilante))].sort();
      const clientes = [...new Set(result.data.map(r => r.cliente))].sort();
      setVigilantesList(vigilantes);
      setClientesList(clientes);
      
      const stats = ReportService.getStatistics(result.data);
      setStatistics(stats);
    } else {
      showNotification('Erro ao carregar relatórios: ' + result.error, 'error');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...reports];

    // Filtro por data
    if (filters.data) {
      filtered = filtered.filter(report => {
        const reportDate = report.dataHora.substring(0, 10);
        const filterDate = filters.data;
        return reportDate === filterDate;
      });
    }

    // Filtro por vigilante
    if (filters.vigilante) {
      filtered = filtered.filter(report => report.vigilante === filters.vigilante);
    }

    // Filtro por cliente
    if (filters.cliente) {
      filtered = filtered.filter(report => report.cliente === filters.cliente);
    }

    setFilteredReports(filtered);
  }, [filters, reports]);

  const handleFilterChange = (filterName, value) => {
    if (filterName === 'clear') {
      setFilters({
        data: '',
        vigilante: '',
        cliente: ''
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [filterName]: value
      }));
    }
  };

  const handleDeleteReport = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este relatório?')) {
      const result = await ReportService.deleteReport(id);
      if (result.success) {
        showNotification('Relatório deletado com sucesso!', 'success');
        loadReports();
      } else {
        showNotification('Erro ao deletar relatório: ' + result.error, 'error');
      }
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const hasActiveFilters = filters.data || filters.vigilante || filters.cliente;

  return (
    <div className="relatorios-page">
      <header className="page-header">
        <h1>📊 Relatórios de Vigilantes</h1>
        <p>Visualização e gerenciamento de relatórios</p>
      </header>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <Statistics stats={statistics} />

      <div className="page-actions">
        <button 
          className="btn btn-primary"
          onClick={loadReports}
        >
          🔄 Atualizar Relatórios
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => setShowCharts(!showCharts)}
        >
          {showCharts ? '📊 Ocultar Gráficos' : '📈 Mostrar Gráficos'}
        </button>
        {hasActiveFilters && (
          <div className="active-filters-info">
            <span>🔍 Filtros ativos - Mostrando {filteredReports.length} de {reports.length} relatórios</span>
          </div>
        )}
      </div>

      {showCharts && reports.length > 0 && (
        <DashboardCharts reports={reports} />
      )}

      <ReportFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        vigilantes={vigilantesList}
        clientes={clientesList}
      />

      {loading ? (
        <div className="loading">Carregando relatórios...</div>
      ) : (
        <ReportList
          reports={filteredReports}
          onDelete={handleDeleteReport}
        />
      )}
    </div>
  );
}

export default RelatoriosPage;
