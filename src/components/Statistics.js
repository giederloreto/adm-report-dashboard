// View: Componente de Estatísticas
import React from 'react';
import './Statistics.css';

function Statistics({ stats }) {
  return (
    <div className="statistics">
      <div className="stat-card total">
        <h3>Total de Relatórios</h3>
        <p className="stat-number">{stats.total}</p>
      </div>
      <div className="stat-card today">
        <h3>Hoje</h3>
        <p className="stat-number">{stats.hoje}</p>
      </div>
      <div className="stat-card photos">
        <h3>Com Fotos</h3>
        <p className="stat-number">{stats.comFoto}</p>
      </div>
      <div className="stat-card clients">
        <h3>Clientes</h3>
        <p className="stat-number">{stats.clientes}</p>
      </div>
      <div className="stat-card vigilantes">
        <h3>Vigilantes Ativos</h3>
        <p className="stat-number">{stats.vigilantes || 0}</p>
      </div>
    </div>
  );
}

export default Statistics;
