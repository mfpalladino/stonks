const ProductList = ({ produtos, onEdit, onDelete }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td style={{ fontWeight: '500' }}>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.quantidade}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => onEdit(produto)} className="secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>Editar</button>
                  <button onClick={() => onDelete(produto.id)} className="danger" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>Deletar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
