from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.postgresql import get_db

from app.models.subject_model import Subject

from app.schemas.subject_schema import (
    SubjectCreate,
    SubjectResponse
)


router = APIRouter()


@router.post("/subjects", response_model=SubjectResponse)
def create_subject(
    subject: SubjectCreate,
    db: Session = Depends(get_db)
):

    new_subject = Subject(
        name=subject.name,
        user_id=subject.user_id
    )

    db.add(new_subject)

    db.commit()

    db.refresh(new_subject)

    return new_subject


@router.get("/subjects")
def get_subjects(db: Session = Depends(get_db)):

    subjects = db.query(Subject).all()

    return subjects

@router.delete("/subjects/{subject_id}")
def delete_subject(subject_id: int, db: Session = Depends(get_db)):

    subject = (
        db.query(Subject)
        .filter(Subject.id == subject_id)
        .first()
    )

    if not subject:
        return {"error": "Subject no encontrada"}

    db.delete(subject)

    db.commit()

    return {"message": "Subject eliminada"}