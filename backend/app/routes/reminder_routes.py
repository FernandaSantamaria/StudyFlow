from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.postgresql import get_db

from app.models.reminder_model import Reminder

from app.schemas.reminder_schema import (
    ReminderCreate,
    ReminderResponse
)


router = APIRouter()


@router.post("/reminders", response_model=ReminderResponse)
def create_reminder(
    reminder: ReminderCreate,
    db: Session = Depends(get_db)
):

    new_reminder = Reminder(
        title=reminder.title,
        date=reminder.date,
        user_id=reminder.user_id
    )

    db.add(new_reminder)

    db.commit()

    db.refresh(new_reminder)

    return new_reminder


@router.get("/reminders")
def get_reminders(db: Session = Depends(get_db)):

    reminders = db.query(Reminder).all()

    return reminders