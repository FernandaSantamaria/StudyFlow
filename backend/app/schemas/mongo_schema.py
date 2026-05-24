from pydantic import BaseModel, Field
from typing import Optional, List

class ActivityLogCreate(BaseModel):
    action: str
    user_id: int

class ActivityLogResponse(ActivityLogCreate):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True 


class StudySessionCreate(BaseModel):
    subject: str
    duration_minutes: int
    user_id: int

class StudySessionResponse(StudySessionCreate):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True

class FlashcardCreate(BaseModel):
    question: str
    answer: str
    subject: str
    difficulty: str
    user_id: int


class FlashcardResponse(FlashcardCreate):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True

class NotificationCreate(BaseModel):
    title: str
    message: str
    read: bool = False
    user_id: int


class NotificationResponse(NotificationCreate):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True


class StudyGoalCreate(BaseModel):
    title: str
    target_hours: int
    current_hours: int = 0
    user_id: int


class StudyGoalResponse(StudyGoalCreate):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True


class ResourceCreate(BaseModel):
    title: str
    url: str
    subject: str
    user_id: int


class ResourceResponse(ResourceCreate):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True