// View: Gráficos do Dashboard
import React from 'react';
import './DashboardCharts.css';

function DashboardCharts({ reports }) {
  // Análise de dados
  const getVigilanteStats = () => {
    const stats = {};
    reports.forEach(r => {
      stats[r.vigilante] = (stats[r.vigilante] || 0) + 1;
    });
    return Object.entries(stats)
      .map(([nome, count]) => ({ nome, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getClienteStats = () => {
    const stats = {};
    reports.forEach(r => {
      stats[r.cliente] = (stats[r.cliente] || 0) + 1;
    });
    return Object.entries(stats)
      .map(([nome, count]) => ({ nome, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getRecentActivity = () => {
    const last7Days = {};
    const today = new Date();
    
    // Inicializar últimos 7 dias
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      last7Days[dateStr] = 0;
    }

    // Contar relatórios
    reports.forEach(r => {
      const reportDate = new Date(r.dataHora);
      const dateStr = reportDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      if (last7Days.hasOwnProperty(dateStr)) {
        last7Days[dateStr]++;
      }
    });

    return Object.entries(last7Days).map(([data, count]) => ({ data, count }));
  };

  const vigilanteStats = getVigilanteStats();
  const clienteStats = getClienteStats();
  const activityData = getRecentActivity();
  
  const maxVigilante = Math.max(...vigilanteStats.map(v => v.count), 1);
  const maxCliente = Math.max(...clienteStats.map(c => c.count), 1);
  const maxActivity = Math.max(...activityData.map(a => a.count), 1);

  const comFoto = reports.filter(r => r.foto).length;
  const semFoto = reports.length - comFoto;

  return (
    <div className="dashboard-charts">
      <div className="charts-grid">
        {/* Gráfico de Relatórios por Vigilante */}
        <div className="chart-card">
          <h3>👮 Relatórios por Vigilante</h3>
          <div className="bar-chart">
            {vigilanteStats.map((v, index) => (
              <div key={index} className="bar-item">
                <div className="bar-label">{v.nome}</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar-fill vigilante-bar"
                    style={{ width: `${(v.count / maxVigilante) * 100}%` }}
                  >
                    <span className="bar-value">{v.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de Relatórios por Cliente */}
        <div className="chart-card">
          <h3>🏢 Relatórios por Cliente</h3>
          <div className="bar-chart">
            {clienteStats.map((c, index) => (
              <div key={index} className="bar-item">
                <div className="bar-label">{c.nome.length > 20 ? c.nome.substring(0, 20) + '...' : c.nome}</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar-fill cliente-bar"
                    style={{ width: `${(c.count / maxCliente) * 100}%` }}
                  >
                    <span className="bar-value">{c.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de Atividade Últimos 7 Dias */}
        <div className="chart-card chart-wide">
          <h3>📈 Atividade dos Últimos 7 Dias</h3>
          <div className="line-chart">
            {activityData.map((a, index) => (
              <div key={index} className="line-item">
                <div 
                  className="line-bar"
                  style={{ height: `${(a.count / maxActivity) * 100}%` }}
                >
                  <span className="line-value">{a.count}</span>
                </div>
                <div className="line-label">{a.data}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico Pizza - Com/Sem Foto */}
        <div className="chart-card">
          <h3>📷 Relatórios com Fotos</h3>
          <div className="pie-chart-container">
            <div className="pie-chart">
              <div 
                className="pie-segment pie-foto"
                style={{ 
                  '--percentage': comFoto / reports.length,
                  '--rotation': 0
                }}
              ></div>
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color foto-color"></span>
                <span className="legend-text">Com foto: {comFoto}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color sem-foto-color"></span>
                <span className="legend-text">Sem foto: {semFoto}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;

