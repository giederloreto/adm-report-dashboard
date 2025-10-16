// View: Página de CRUD de Vigilantes
import React, { useState, useEffect, useCallback } from 'react';
import { MockVigilanteService as VigilanteService } from '../services/MockVigilanteService';
import './CrudPage.css';

function VigilantesPage() {
  const [vigilantes, setVigilantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ nome: '' });
  const [errors, setErrors] = useState([]);
  const [notification, setNotification] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const result = await VigilanteService.getAll();
    if (result.success) {
      setVigilantes(result.data);
    } else {
      showNotification('Erro ao carregar vigilantes: ' + result.error, 'error');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ nome: '' });
    setErrors([]);
    setShowForm(true);
  };

  const handleEdit = (vigilante) => {
    setEditingItem(vigilante);
    setFormData({ nome: vigilante.nome });
    setErrors([]);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ nome: '' });
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const result = editingItem
      ? await VigilanteService.update(editingItem.id, formData)
      : await VigilanteService.create(formData);

    if (result.success) {
      showNotification(result.message, 'success');
      loadData();
      handleCancel();
    } else {
      setErrors([result.error]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este vigilante?')) {
      const result = await VigilanteService.delete(id);
      if (result.success) {
        showNotification(result.message, 'success');
        loadData();
      } else {
        showNotification('Erro ao deletar: ' + result.error, 'error');
      }
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>👮 Vigilantes</h1>
          <p>Gerenciamento de vigilantes cadastrados</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Novo Vigilante
        </button>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {showForm && (
        <div className="crud-form-container">
          <h2>{editingItem ? '✏️ Editar Vigilante' : '➕ Novo Vigilante'}</h2>
          
          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map((error, index) => (
                <p key={index}>❌ {error}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="crud-form">
            <div className="form-group">
              <label htmlFor="nome">Nome *</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ nome: e.target.value })}
                placeholder="Nome completo do vigilante"
                required
                autoFocus
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingItem ? '💾 Salvar' : '➕ Criar'}
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Carregando vigilantes...</div>
      ) : (
        <div className="crud-list">
          <h2>📋 Lista de Vigilantes ({vigilantes.length})</h2>
          
          {vigilantes.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum vigilante cadastrado</p>
            </div>
          ) : (
            <div className="crud-table-container">
              <table className="crud-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vigilantes.map((vigilante) => (
                    <tr key={vigilante.id}>
                      <td>{vigilante.nome}</td>
                      <td className="actions-cell">
                        <button
                          onClick={() => handleEdit(vigilante)}
                          className="btn-icon btn-edit"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(vigilante.id)}
                          className="btn-icon btn-delete"
                          title="Deletar"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VigilantesPage;

