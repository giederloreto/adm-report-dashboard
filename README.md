# 📊 Painel ADM - Relatórios de Vigilantes

Sistema de gerenciamento de relatórios de vigilantes com interface moderna e responsiva.

## 🚀 Iniciar

```bash
npm install
npm start
```

Acesse: http://localhost:3000

## 📋 Funcionalidades

- **📊 Relatórios**: Visualização com filtros por data, vigilante e cliente
- **👮 Vigilantes**: CRUD completo (criar, editar, deletar, listar)
- **🏢 Clientes**: CRUD completo com campo cidade
- **📈 Gráficos**: Dashboard com visualizações profissionais
- **📱 Responsivo**: Funciona em desktop, tablet e mobile

## 🎯 Estrutura

```
src/
├── models/          # Estrutura de dados
├── services/        # Lógica de negócio (Mock/Firebase)
├── components/      # Interface React
└── config/          # Configurações
```

## 🔧 Configurar Firebase (Opcional)

1. Edite `src/config/firebase.js` com suas credenciais
2. Em `src/components/*Page.js` troque:
   - `MockReportService` → `ReportService`
   - `MockVigilanteService` → `VigilanteService`
   - `MockClienteService` → `ClienteService`

## 📦 Tecnologias

- React 19
- Firebase 12
- CSS3 (design moderno)

---

Desenvolvido para gerenciamento profissional de relatórios de vigilância.

