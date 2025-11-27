import { useState, useEffect } from 'react';
import { getProdutos } from '../services/produtoService';

const Estoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getProdutos();
        setProdutos(data);
      } catch (err) {
        alert('Erro ao carregar estoque: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="page">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Estoque</h1>
        <p style={{ color: 'var(--text-light)' }}>Visualize a disponibilidade de produtos</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade em Estoque</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td style={{ fontWeight: '500' }}>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td style={{ fontWeight: '600' }}>{produto.quantidade}</td>
              <td>
                {produto.quantidade === 0 ? (
                  <span style={{ 
                    background: '#fee2e2', 
                    color: '#991b1b', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>Sem estoque</span>
                ) : produto.quantidade < 10 ? (
                  <span style={{ 
                    background: '#fef3c7', 
                    color: '#92400e', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>Estoque baixo</span>
                ) : (
                  <span style={{ 
                    background: '#d1fae5', 
                    color: '#065f46', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>OK</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estoque;
