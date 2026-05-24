from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.postgresql import get_db

from app.models.note_model import Note

from app.schemas.note_schema import (
    NoteCreate,
    NoteResponse
)


router = APIRouter()


@router.post("/notes", response_model=NoteResponse)
def create_note(
    note: NoteCreate,
    db: Session = Depends(get_db)
):

    new_note = Note(
        content=note.content,
        user_id=note.user_id
    )

    db.add(new_note)

    db.commit()

    db.refresh(new_note)

    return new_note


@router.get("/notes")
def get_notes(db: Session = Depends(get_db)):

    notes = db.query(Note).all()

    return notes