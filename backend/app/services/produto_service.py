from sqlalchemy.orm import Session
from app.models.produto import Produto
from app.schemas.produto import ProdutoCreate, ProdutoUpdate


def get_all(db: Session) -> list[Produto]:
    return db.query(Produto).all()


def get_by_id(db: Session, produto_id: int) -> Produto | None:
    return db.query(Produto).filter(Produto.id == produto_id).first()


def create(db: Session, produto: ProdutoCreate) -> Produto:
    db_produto = Produto(**produto.model_dump())
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto


def update(db: Session, produto_id: int, produto: ProdutoUpdate) -> Produto | None:
    db_produto = get_by_id(db, produto_id)
    if not db_produto:
        return None
    
    update_data = produto.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_produto, key, value)
    
    db.commit()
    db.refresh(db_produto)
    return db_produto


def delete(db: Session, produto_id: int) -> bool:
    db_produto = get_by_id(db, produto_id)
    if not db_produto:
        return False
    
    db.delete(db_produto)
    db.commit()
    return True
