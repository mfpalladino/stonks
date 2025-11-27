# Padrões de Código - Backend

> **Nota**: Este documento descreve os padrões implementados no MVP. Para projetos maiores, considere adicionar testes, type checking (mypy), e ferramentas de linting.

## Estilo de Código

### Convenções Python
- Seguir **PEP 8**
- Usar **type hints** quando possível
- Código limpo e legível

## Estrutura de Arquivos

### Nomenclatura
- **Arquivos**: snake_case (ex: `produto_service.py`)
- **Classes**: PascalCase (ex: `ProdutoService`)
- **Funções/Variáveis**: snake_case (ex: `get_produto_by_id`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `DATABASE_URL`)

### Organização de Pastas
Ver estrutura completa em [stack-tecnologia.md](stack-tecnologia.md)

## Padrões Implementados

### Rotas (Endpoints)
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.produto import ProdutoCreate, ProdutoResponse
from app.services import produto_service

router = APIRouter()

@router.get("/produtos", response_model=list[ProdutoResponse])
async def listar_produtos(db: Session = Depends(get_db)):
    """Lista todos os produtos."""
    return produto_service.get_all(db)

@router.post("/produtos", response_model=ProdutoResponse)
async def criar_produto(
    produto: ProdutoCreate,
    db: Session = Depends(get_db)
):
    """Cria um novo produto."""
    return produto_service.create(db, produto)

@router.get("/produtos/{produto_id}", response_model=ProdutoResponse)
async def obter_produto(produto_id: int, db: Session = Depends(get_db)):
    """Retorna um produto pelo ID."""
    produto = produto_service.get_by_id(db, produto_id)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto
```

### Models (SQLAlchemy)
```python
from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base

class Produto(Base):
    __tablename__ = "produtos"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    preco = Column(Float, nullable=False)
    quantidade = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
```

### Schemas (Pydantic)
```python
from pydantic import BaseModel, Field
from datetime import datetime

class ProdutoBase(BaseModel):
    nome: str = Field(..., min_length=1, max_length=100)
    preco: float = Field(..., gt=0)
    quantidade: int = Field(default=0, ge=0)

class ProdutoCreate(ProdutoBase):
    pass

class ProdutoUpdate(BaseModel):
    nome: str | None = None
    preco: float | None = None
    quantidade: int | None = None

class ProdutoResponse(ProdutoBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
```

### Services
```python
from sqlalchemy.orm import Session
from app.models.produto import Produto
from app.schemas.produto import ProdutoCreate, ProdutoUpdate

def get_all(db: Session) -> list[Produto]:
    """Retorna todos os produtos."""
    return db.query(Produto).all()

def get_by_id(db: Session, produto_id: int) -> Produto | None:
    """Retorna um produto pelo ID."""
    return db.query(Produto).filter(Produto.id == produto_id).first()

def create(db: Session, produto: ProdutoCreate) -> Produto:
    """Cria um novo produto."""
    db_produto = Produto(**produto.model_dump())
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto

def update(db: Session, produto_id: int, produto: ProdutoUpdate) -> Produto | None:
    """Atualiza um produto existente."""
    db_produto = get_by_id(db, produto_id)
    if not db_produto:
        return None
    
    for key, value in produto.model_dump(exclude_unset=True).items():
        setattr(db_produto, key, value)
    
    db.commit()
    db.refresh(db_produto)
    return db_produto

def delete(db: Session, produto_id: int) -> bool:
    """Deleta um produto."""
    db_produto = get_by_id(db, produto_id)
    if not db_produto:
        return False
    
    db.delete(db_produto)
    db.commit()
    return True
```

### Database Configuration
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./stonks.db"

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Boas Práticas Aplicadas

### Tratamento de Erros
- HTTPException para erros de API
- Validação automática via Pydantic
- Mensagens de erro claras

### Validação
- Validação de dados no schema (Pydantic)
- Validação de regras de negócio no service
- Constraints no banco de dados

### Banco de Dados
- Uso correto de transações (commit/rollback)
- Sessões fechadas corretamente (try/finally)
- Relacionamentos definidos nos models

### Segurança
- Validação de inputs via Pydantic
- CORS configurado adequadamente
- Preparado para adicionar autenticação futura

## CORS Configuration
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Melhorias Futuras

Para evolução do projeto, considere adicionar:
- **pytest** para testes automatizados
- **mypy** para type checking estático
- **Black** para formatação automática
- **Ruff** ou **Flake8** para linting
- **Alembic** para migrations de banco
- **JWT** para autenticação
- **Logging** estruturado
- **Rate limiting** para proteção de API
- **PostgreSQL** para produção
