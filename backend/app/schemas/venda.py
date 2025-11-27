from pydantic import BaseModel, Field
from datetime import datetime


class VendaCreate(BaseModel):
    produto_id: int = Field(..., gt=0)
    quantidade: int = Field(..., gt=0)


class VendaResponse(BaseModel):
    id: int
    produto_id: int
    quantidade: int
    valor_total: float
    data: datetime

    class Config:
        from_attributes = True
