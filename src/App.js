import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RelatoriosPage from './components/RelatoriosPage';
import VigilantesPage from './components/VigilantesPage';
import ClientesPage from './components/ClientesPage';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('relatorios');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'relatorios':
        return <RelatoriosPage />;
      case 'vigilantes':
        return <VigilantesPage />;
      case 'clientes':
        return <ClientesPage />;
      default:
        return <RelatoriosPage />;
    }
  };

  return (
    <div className="App">
      <Sidebar 
        activeSection={activeSection}
        onNavigate={setActiveSection}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="main-content">
        <button 
          className="btn-mobile-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰ Menu
        </button>
        
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
