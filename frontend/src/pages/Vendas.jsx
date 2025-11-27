import { useState, useEffect } from 'react';
import { getProdutos } from '../services/produtoService';
import { getVendas, createVenda } from '../services/vendaService';
import VendaForm from '../components/vendas/VendaForm';

const Vendas = () => {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [produtosData, vendasData] = await Promise.all([
        getProdutos(),
        getVendas(),
      ]);
      setProdutos(produtosData);
      setVendas(vendasData);
    } catch (err) {
      alert('Erro ao carregar dados: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (venda) => {
    try {
      await createVenda(venda);
      fetchData();
      alert('Venda registrada com sucesso!');
    } catch (err) {
      alert('Erro ao registrar venda: ' + err.response?.data?.detail || err.message);
    }
  };

  const getProdutoNome = (produtoId) => {
    const produto = produtos.find(p => p.id === produtoId);
    return produto ? produto.nome : `Produto #${produtoId}`;
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="page">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Vendas</h1>
        <p style={{ color: 'var(--text-light)' }}>Registre vendas e acompanhe o histórico</p>
      </div>
      <VendaForm produtos={produtos} onSubmit={handleCreate} />
      
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '2rem 0 1rem' }}>Histórico de Vendas</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id}>
              <td>{new Date(venda.data).toLocaleString('pt-BR')}</td>
              <td>{getProdutoNome(venda.produto_id)}</td>
              <td>{venda.quantidade}</td>
              <td style={{ color: 'var(--primary)', fontWeight: '600' }}>R$ {venda.valor_total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vendas;
