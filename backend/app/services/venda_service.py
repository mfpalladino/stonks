from sqlalchemy.orm import Session
from app.models.venda import Venda
from app.schemas.venda import VendaCreate
from app.services import produto_service


def get_all(db: Session) -> list[Venda]:
    return db.query(Venda).all()


def create(db: Session, venda: VendaCreate) -> Venda | None:
    produto = produto_service.get_by_id(db, venda.produto_id)
    if not produto:
        return None
    
    if produto.quantidade < venda.quantidade:
        return None
    
    valor_total = produto.preco * venda.quantidade
    
    db_venda = Venda(
        produto_id=venda.produto_id,
        quantidade=venda.quantidade,
        valor_total=valor_total
    )
    
    produto.quantidade -= venda.quantidade
    
    db.add(db_venda)
    db.commit()
    db.refresh(db_venda)
    return db_venda
