from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.postgresql import get_db

from app.models.task_model import Task

from app.schemas.task_schema import TaskCreate, TaskResponse


router = APIRouter()


@router.post("/tasks", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):

    new_task = Task(
        title=task.title,
        description=task.description,
        user_id=task.user_id
    )

    db.add(new_task)

    db.commit()

    db.refresh(new_task)

    return new_task


@router.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):

    tasks = db.query(Task).all()

    return tasks

@router.put("/tasks/{task_id}/toggle")
def toggle_task_completed(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return {"error": "Task no encontrada"}

    task.completed = not task.completed

    db.commit()
    db.refresh(task)

    return task

@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    updated_task: TaskCreate,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return {"error": "Task no encontrada"}

    task.title = updated_task.title
    task.description = updated_task.description
    task.user_id = updated_task.user_id

    db.commit()

    db.refresh(task)

    return task


@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return {"error": "Task no encontrada"}

    db.delete(task)

    db.commit()

    return {"message": "Task eliminada correctamente"}