// View: Filtros de Relatórios
import React from 'react';
import './ReportFilters.css';

function ReportFilters({ filters, onFilterChange, vigilantes, clientes }) {
  // Data de hoje no formato YYYY-MM-DD
  const hoje = new Date().toISOString().split('T')[0];

  return (
    <div className="report-filters">
      <h3>🔍 Filtros</h3>
      
      <div className="filters-grid">
        {/* Filtro por Data */}
        <div className="filter-group">
          <label htmlFor="filter-data">📅 Data</label>
          <input
            type="date"
            id="filter-data"
            value={filters.data || ''}
            max={hoje}
            onChange={(e) => onFilterChange('data', e.target.value)}
          />
        </div>

        {/* Filtro por Vigilante */}
        <div className="filter-group">
          <label htmlFor="filter-vigilante">👮 Vigilante</label>
          <select
            id="filter-vigilante"
            value={filters.vigilante || ''}
            onChange={(e) => onFilterChange('vigilante', e.target.value)}
          >
            <option value="">Todos</option>
            {vigilantes.map((v, index) => (
              <option key={index} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Cliente */}
        <div className="filter-group">
          <label htmlFor="filter-cliente">🏢 Cliente</label>
          <select
            id="filter-cliente"
            value={filters.cliente || ''}
            onChange={(e) => onFilterChange('cliente', e.target.value)}
          >
            <option value="">Todos</option>
            {clientes.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Botão Limpar Filtros */}
        <div className="filter-group filter-actions">
          <button 
            className="btn btn-clear"
            onClick={() => onFilterChange('clear', null)}
          >
            ❌ Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportFilters;
