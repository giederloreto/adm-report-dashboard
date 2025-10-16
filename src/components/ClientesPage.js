// View: Página de CRUD de Clientes
import React, { useState, useEffect, useCallback } from 'react';
import { MockClienteService as ClienteService } from '../services/MockClienteService';
import './CrudPage.css';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ nome: '', cidade: '' });
  const [errors, setErrors] = useState([]);
  const [notification, setNotification] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const result = await ClienteService.getAll();
    if (result.success) {
      setClientes(result.data);
    } else {
      showNotification('Erro ao carregar clientes: ' + result.error, 'error');
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
    setFormData({ nome: '', cidade: '' });
    setErrors([]);
    setShowForm(true);
  };

  const handleEdit = (cliente) => {
    setEditingItem(cliente);
    setFormData({ nome: cliente.nome, cidade: cliente.cidade });
    setErrors([]);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ nome: '', cidade: '' });
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const result = editingItem
      ? await ClienteService.update(editingItem.id, formData)
      : await ClienteService.create(formData);

    if (result.success) {
      showNotification(result.message, 'success');
      loadData();
      handleCancel();
    } else {
      setErrors([result.error]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      const result = await ClienteService.delete(id);
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
          <h1>🏢 Clientes</h1>
          <p>Gerenciamento de clientes cadastrados</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Novo Cliente
        </button>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {showForm && (
        <div className="crud-form-container">
          <h2>{editingItem ? '✏️ Editar Cliente' : '➕ Novo Cliente'}</h2>
          
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
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Nome do cliente"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="cidade">Cidade *</label>
              <input
                type="text"
                id="cidade"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                placeholder="Cidade do cliente"
                required
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
        <div className="loading">Carregando clientes...</div>
      ) : (
        <div className="crud-list">
          <h2>📋 Lista de Clientes ({clientes.length})</h2>
          
          {clientes.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum cliente cadastrado</p>
            </div>
          ) : (
            <div className="crud-table-container">
              <table className="crud-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Cidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.nome}</td>
                      <td>{cliente.cidade}</td>
                      <td className="actions-cell">
                        <button
                          onClick={() => handleEdit(cliente)}
                          className="btn-icon btn-edit"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(cliente.id)}
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

export default ClientesPage;

