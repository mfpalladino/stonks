import { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, onCancel, editingProduct }) => {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    quantidade: '',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        nome: editingProduct.nome,
        preco: editingProduct.preco,
        quantidade: editingProduct.quantidade,
      });
    }
  }, [editingProduct]);

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
    <form onSubmit={handleSubmit} style={{ 
      background: 'var(--surface)', 
      padding: '1.5rem', 
      borderRadius: '8px', 
      boxShadow: 'var(--shadow)',
      marginBottom: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    }}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Preço"
        value={formData.preco}
        onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={formData.quantidade}
        onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
        required
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" className="primary">{editingProduct ? 'Atualizar' : 'Salvar'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default ProductForm;
