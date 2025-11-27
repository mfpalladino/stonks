from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.venda import VendaCreate, VendaResponse
from app.services import venda_service

router = APIRouter()


@router.get("/", response_model=list[VendaResponse])
def listar_vendas(db: Session = Depends(get_db)):
    return venda_service.get_all(db)


@router.post("/", response_model=VendaResponse, status_code=201)
def criar_venda(venda: VendaCreate, db: Session = Depends(get_db)):
    db_venda = venda_service.create(db, venda)
    if not db_venda:
        raise HTTPException(
            status_code=400, 
            detail="Produto não encontrado ou estoque insuficiente"
        )
    return db_venda
