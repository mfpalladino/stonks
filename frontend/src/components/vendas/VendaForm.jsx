import { useState, useRef, useEffect } from 'react';

const VendaForm = ({ produtos, onSubmit }) => {
  const [busca, setBusca] = useState('');
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) && p.quantidade > 0
  ).slice(0, 8);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [busca]);

  const handleSelectProduto = (produto) => {
    setSelectedProduto(produto);
    setBusca(produto.nome);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || produtosFiltrados.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < produtosFiltrados.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectProduto(produtosFiltrados[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduto) return;
    onSubmit({
      produto_id: selectedProduto.id,
      quantidade: parseInt(quantidade),
    });
    setSelectedProduto(null);
    setBusca('');
    setQuantidade('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      background: 'var(--surface)', 
      padding: '1.5rem', 
      borderRadius: '8px', 
      boxShadow: 'var(--shadow)',
      marginBottom: '2rem',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr auto',
      gap: '1rem',
      alignItems: 'start'
    }}>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setSelectedProduto(null);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          autoComplete="off"
          required
        />
        {showSuggestions && busca && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            marginTop: '0.25rem',
            maxHeight: '300px',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 10
          }}>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto, index) => (
                <div
                  key={produto.id}
                  onClick={() => handleSelectProduto(produto)}
                  style={{
                    padding: '0.75rem',
                    cursor: 'pointer',
                    background: highlightedIndex === index ? 'var(--bg)' : 'transparent',
                    borderBottom: '1px solid var(--border)'
                  }}
                >
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{produto.nome}</div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>R$ {produto.preco.toFixed(2)}</span>
                    <span>Estoque: {produto.quantidade}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '0.75rem', color: 'var(--text-light)' }}>Nenhum produto encontrado</div>
            )}
          </div>
        )}
      </div>
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        min="1"
        max={selectedProduto?.quantidade || ''}
        required
      />
      <button type="submit" disabled={!selectedProduto} className="primary">Registrar Venda</button>
    </form>
  );
};

export default VendaForm;
