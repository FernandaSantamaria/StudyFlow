from pydantic import BaseModel


class TaskCategoryCreate(BaseModel):

    name: str


class TaskCategoryResponse(BaseModel):

    id: int
    name: str

    class Config:
        orm_mode = True