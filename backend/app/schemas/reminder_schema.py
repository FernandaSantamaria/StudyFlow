from pydantic import BaseModel


class ReminderCreate(BaseModel):

    title: str
    date: str
    user_id: int


class ReminderResponse(BaseModel):

    id: int
    title: str
    date: str
    user_id: int

    class Config:
        orm_mode = True


class NotificationCreate(BaseModel):
    title: str
    message: str
    read: bool = False
    user_id: int


class NotificationResponse(NotificationCreate):
    id: str


class StudyGoalCreate(BaseModel):
    title: str
    target_hours: int
    current_hours: int = 0
    user_id: int


class StudyGoalResponse(StudyGoalCreate):
    id: str


class ResourceCreate(BaseModel):
    title: str
    url: str
    subject: str
    user_id: int


class ResourceResponse(ResourceCreate):
    id: str