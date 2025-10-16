// View: Lista de Relatórios - Apenas visualização
import React, { useState } from 'react';
import './ReportList.css';

function ReportList({ reports, onDelete }) {
  const [expandedReport, setExpandedReport] = useState(null);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const toggleExpand = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  if (reports.length === 0) {
    return (
      <div className="empty-state">
        <h3>📋 Nenhum relatório encontrado</h3>
        <p>Os relatórios criados pelo sistema aparecerão aqui</p>
      </div>
    );
  }

  return (
    <div className="report-list">
      <h2>📋 Relatórios ({reports.length})</h2>
      
      <div className="reports-grid">
        {reports.map((report) => (
          <div 
            key={report.id} 
            className={`report-card ${expandedReport === report.id ? 'expanded' : ''}`}
          >
            {/* Header do Card */}
            <div className="report-card-header">
              <div className="report-header-left">
                <h3>{report.titulo}</h3>
                <div className="report-meta">
                  <span className="meta-item">
                    🕐 {formatDateTime(report.dataHora)}
                  </span>
                  <span className="meta-item">
                    👮 {report.vigilante}
                  </span>
                  <span className="meta-item">
                    🏢 {report.cliente}
                  </span>
                  {report.foto && (
                    <span className="meta-item has-photo">
                      📷 Com foto
                    </span>
                  )}
                </div>
              </div>
              <div className="report-header-actions">
                <button
                  onClick={() => toggleExpand(report.id)}
                  className="btn-icon btn-expand"
                  title={expandedReport === report.id ? "Recolher" : "Expandir"}
                >
                  {expandedReport === report.id ? '🔼' : '🔽'}
                </button>
                <button
                  onClick={() => onDelete(report.id)}
                  className="btn-icon btn-delete"
                  title="Deletar"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Preview da Descrição (sempre visível) */}
            <div className="report-preview">
              <p>
                {report.descricao.length > 120 
                  ? report.descricao.substring(0, 120) + '...' 
                  : report.descricao}
              </p>
            </div>

            {/* Conteúdo Expandido */}
            {expandedReport === report.id && (
              <div className="report-expanded-content">
                <div className="report-section">
                  <h4>📝 Descrição Completa</h4>
                  <p className="full-description">{report.descricao}</p>
                </div>

                {report.foto && (
                  <div className="report-section">
                    <h4>📷 Foto do Relatório</h4>
                    <div className="report-photo">
                      <img 
                        src={report.foto} 
                        alt={report.titulo}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Imagem+Indisponível';
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="report-section report-details">
                  <h4>ℹ️ Detalhes do Relatório</h4>
                  <div className="details-grid">
                    <div className="detail-item">
                      <strong>Vigilante:</strong>
                      <span>{report.vigilante}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Cliente:</strong>
                      <span>{report.cliente}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Data:</strong>
                      <span>{formatDate(report.dataHora)}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Horário:</strong>
                      <span>{new Date(report.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportList;
