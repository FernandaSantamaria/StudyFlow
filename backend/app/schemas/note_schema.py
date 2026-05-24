from pydantic import BaseModel


class NoteCreate(BaseModel):

    content: str
    user_id: int


class NoteResponse(BaseModel):

    id: int
    content: str
    user_id: int

    class Config:
        orm_mode = True