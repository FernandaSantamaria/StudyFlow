from pydantic import BaseModel


class SubjectCreate(BaseModel):

    name: str
    user_id: int


class SubjectResponse(BaseModel):

    id: int
    name: str
    user_id: int

    class Config:
        orm_mode = True