import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Produtos from './pages/Produtos';
import Vendas from './pages/Vendas';
import Estoque from './pages/Estoque';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <svg className="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 7H21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1>Stonks</h1>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Produtos</Link></li>
            <li><Link to="/vendas">Vendas</Link></li>
            <li><Link to="/estoque">Estoque</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Produtos />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/estoque" element={<Estoque />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
