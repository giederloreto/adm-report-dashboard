// View: Menu Lateral
import React from 'react';
import logo from '../logo.svg';
import './Sidebar.css';

function Sidebar({ activeSection, onNavigate, isMobileOpen, onCloseMobile }) {
  const menuItems = [
    { id: 'relatorios', icon: '📊', label: 'Relatórios' },
    { id: 'vigilantes', icon: '👮', label: 'Vigilantes' },
    { id: 'clientes', icon: '🏢', label: 'Clientes' }
  ];

  const handleItemClick = (id) => {
    onNavigate(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {isMobileOpen && <div className="sidebar-overlay" onClick={onCloseMobile}></div>}
      
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h2>Menu</h2>
          {isMobileOpen && (
            <button className="btn-close-mobile" onClick={onCloseMobile}>
              ✕
            </button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Painel ADM v1.0</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

