# Stack de Tecnologia

## Frontend
- **Framework**: React 18
- **Linguagem**: JavaScript (JSX)
- **Estilização**: CSS com variáveis CSS
- **Build**: Vite
- **Roteamento**: React Router DOM
- **HTTP Client**: Axios

## Backend
- **Framework**: FastAPI
- **Linguagem**: Python 3.11+
- **ORM**: SQLAlchemy
- **Validação**: Pydantic (nativo do FastAPI)
- **Servidor**: Uvicorn

## Banco de Dados
- **Atual**: SQLite (arquivo local)
- **Futuro**: PostgreSQL (se migrar para produção)

## Estrutura do Projeto

```
stonks/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── produtos.py
│   │   │       │   ├── vendas.py
│   │   │       │   └── estoque.py
│   │   │       └── router.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   ├── produto.py
│   │   │   └── venda.py
│   │   ├── schemas/
│   │   │   ├── produto.py
│   │   │   └── venda.py
│   │   ├── services/
│   │   │   ├── produto_service.py
│   │   │   └── venda_service.py
│   │   └── database.py
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── produtos/
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   └── ProductList.jsx
│   │   │   └── vendas/
│   │   │       └── VendaForm.jsx
│   │   ├── pages/
│   │   │   ├── Produtos.jsx
│   │   │   ├── Vendas.jsx
│   │   │   └── Estoque.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── produtoService.js
│   │   │   └── vendaService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── docs/
    ├── produto.md
    ├── fases-projeto.md
    ├── stack-tecnologia.md
    ├── padroes-frontend.md
    └── padroes-backend.md
```

## Dependências Principais

### Backend
```txt
fastapi
uvicorn[standard]
sqlalchemy
pydantic
python-multipart
```

### Frontend
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x"
}
```

## Decisões Arquiteturais

### Por que SQLite?
- Zero configuração para MVP
- Arquivo único, fácil de compartilhar
- Suficiente para demonstração e uso local
- Migração simples para PostgreSQL quando necessário

### Por que FastAPI?
- Documentação automática (Swagger UI)
- Validação de dados integrada (Pydantic)
- Performance superior
- Tipagem forte e moderna

### Por que React + Vite?
- Componentização e reusabilidade
- Vite oferece hot reload instantâneo
- Ecossistema maduro e amplamente adotado
- Facilita escalabilidade futura

### Por que CSS com variáveis?
- Simplicidade para MVP de 2h
- Sem dependências extras (sem Tailwind/CSS-in-JS)
- Variáveis CSS para consistência de cores e espaçamentos
- Fácil de entender e modificar

## Justificativa da Stack
Stack escolhida para maximizar velocidade de desenvolvimento em um Coding Dojo de 2 horas, priorizando:
- Ferramentas modernas e produtivas
- Documentação automática
- Tipagem e validação
- Facilidade de manutenção futura
