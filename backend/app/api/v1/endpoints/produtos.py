from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.produto import ProdutoCreate, ProdutoUpdate, ProdutoResponse
from app.services import produto_service

router = APIRouter()


@router.get("/", response_model=list[ProdutoResponse])
def listar_produtos(db: Session = Depends(get_db)):
    return produto_service.get_all(db)


@router.get("/{produto_id}", response_model=ProdutoResponse)
def obter_produto(produto_id: int, db: Session = Depends(get_db)):
    produto = produto_service.get_by_id(db, produto_id)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto


@router.post("/", response_model=ProdutoResponse, status_code=201)
def criar_produto(produto: ProdutoCreate, db: Session = Depends(get_db)):
    return produto_service.create(db, produto)


@router.put("/{produto_id}", response_model=ProdutoResponse)
def atualizar_produto(
    produto_id: int, produto: ProdutoUpdate, db: Session = Depends(get_db)
):
    db_produto = produto_service.update(db, produto_id, produto)
    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return db_produto


@router.delete("/{produto_id}", status_code=204)
def deletar_produto(produto_id: int, db: Session = Depends(get_db)):
    if not produto_service.delete(db, produto_id):
        raise HTTPException(status_code=404, detail="Produto não encontrado")
