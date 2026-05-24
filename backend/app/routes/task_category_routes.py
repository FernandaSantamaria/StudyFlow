from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.postgresql import get_db

from app.models.task_category_model import TaskCategory

from app.schemas.task_category_schema import (
    TaskCategoryCreate,
    TaskCategoryResponse
)


router = APIRouter()


@router.post(
    "/task-categories",
    response_model=TaskCategoryResponse
)
def create_task_category(
    category: TaskCategoryCreate,
    db: Session = Depends(get_db)
):

    new_category = TaskCategory(
        name=category.name
    )

    db.add(new_category)

    db.commit()

    db.refresh(new_category)

    return new_category


@router.get("/task-categories")
def get_task_categories(
    db: Session = Depends(get_db)
):

    categories = db.query(TaskCategory).all()

    return categories