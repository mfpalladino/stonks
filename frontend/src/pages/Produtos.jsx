import { useState, useEffect } from 'react';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '../services/produtoService';
import ProductForm from '../components/produtos/ProductForm';
import ProductList from '../components/produtos/ProductList';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

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

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async (produto) => {
    try {
      if (editingProduct) {
        await updateProduto(editingProduct.id, produto);
        setEditingProduct(null);
      } else {
        await createProduto(produto);
      }
      fetchProdutos();
    } catch (err) {
      alert('Erro ao salvar produto: ' + err.message);
    }
  };

  const handleEdit = (produto) => {
    setEditingProduct(produto);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente deletar este produto?')) {
      try {
        await deleteProduto(id);
        fetchProdutos();
      } catch (err) {
        alert('Erro ao deletar produto: ' + err.message);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="page">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Produtos</h1>
        <p style={{ color: 'var(--text-light)' }}>Gerencie o catálogo de produtos</p>
      </div>
      <ProductForm 
        onSubmit={handleSubmit} 
        onCancel={editingProduct ? handleCancelEdit : null}
        editingProduct={editingProduct}
      />
      <ProductList produtos={produtos} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Produtos;
