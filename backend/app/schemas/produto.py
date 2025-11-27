from pydantic import BaseModel, Field


class ProdutoBase(BaseModel):
    nome: str = Field(..., min_length=1, max_length=100)
    preco: float = Field(..., gt=0)
    quantidade: int = Field(default=0, ge=0)


class ProdutoCreate(ProdutoBase):
    pass


class ProdutoUpdate(BaseModel):
    nome: str | None = Field(None, min_length=1, max_length=100)
    preco: float | None = Field(None, gt=0)
    quantidade: int | None = Field(None, ge=0)


class ProdutoResponse(ProdutoBase):
    id: int

    class Config:
        from_attributes = True
