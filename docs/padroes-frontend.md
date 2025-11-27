# Padrões de Código - Frontend

> **Nota**: Este documento descreve os padrões implementados no MVP. Para projetos maiores, considere adicionar PropTypes, testes, e ferramentas de linting.

## Estilo de Código

### Convenções JavaScript/React
- Usar **ES6+** (arrow functions, destructuring, spread operator)
- Preferir **const** sobre let, evitar var
- Usar **async/await** para operações assíncronas
- Componentes funcionais com hooks

## Estrutura de Arquivos

### Nomenclatura
- **Componentes**: PascalCase (ex: `ProductCard.jsx`)
- **Funções/Variáveis**: camelCase (ex: `getUserData`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_BASE_URL`)

### Organização de Pastas
Ver estrutura completa em [stack-tecnologia.md](stack-tecnologia.md)

## Padrões Implementados

### Componentes Funcionais
```jsx
import { useState } from 'react';

const ProductForm = ({ onSubmit, editingProduct }) => {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    quantidade: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nome: formData.nome,
      preco: parseFloat(formData.preco),
      quantidade: parseInt(formData.quantidade),
    });
    setFormData({ nome: '', preco: '', quantidade: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        required
      />
      <button type="submit" className="primary">Salvar</button>
    </form>
  );
};

export default ProductForm;
```

### Services (API)
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProdutos = async () => {
  const response = await api.get('/produtos');
  return response.data;
};

export const createProduto = async (produto) => {
  const response = await api.post('/produtos', produto);
  return response.data;
};
```

### Gerenciamento de Estado
```jsx
const [produtos, setProdutos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProdutos();
}, []);
```

## Estilização

### CSS com Variáveis
```css
:root {
  --primary: #10b981;
  --primary-dark: #059669;
  --text: #111827;
  --bg: #f9fafb;
}

button.primary {
  background: var(--primary);
  color: white;
}

button.primary:hover {
  background: var(--primary-dark);
}
```

### Inline Styles para Valores Dinâmicos
```jsx
<span style={{ 
  color: produto.quantidade === 0 ? 'var(--danger)' : 'var(--primary)',
  fontWeight: '600'
}}>
  {produto.quantidade}
</span>
```

## Boas Práticas Aplicadas

### Componentes
- Um componente por arquivo
- Componentes pequenos e focados
- Props descritivas e claras

### Tratamento de Erros
- Try/catch em todas as chamadas assíncronas
- Mensagens de erro amigáveis ao usuário
- Estados de loading para feedback visual

### Acessibilidade
- Tags semânticas (button, nav, main)
- Inputs com placeholders descritivos
- Botões com texto claro

### Performance
- useEffect com array de dependências correto
- Evitar re-renders desnecessários
- Limpeza de estados após submit

## Melhorias Futuras

Para evolução do projeto, considere adicionar:
- **PropTypes** ou **TypeScript** para validação de props
- **ESLint + Prettier** para formatação consistente
- **React Testing Library** para testes
- **Custom Hooks** para lógica reutilizável
- **Context API** para estado global
- **Error Boundaries** para erros de renderização
