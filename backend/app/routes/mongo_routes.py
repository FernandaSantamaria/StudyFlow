from fastapi import APIRouter, status, HTTPException
from typing import List
from bson import ObjectId

from app.database.mongodb import mongo_db

from app.schemas.mongo_schema import (
    StudySessionCreate,
    StudySessionResponse,
    ActivityLogCreate,
    ActivityLogResponse,
    NotificationCreate,
    StudyGoalCreate,
    ResourceCreate,
    FlashcardCreate
)

router = APIRouter(prefix="/mongo", tags=["MongoDB Elements"])


@router.post(
    "/activity-logs", 
    response_model=ActivityLogResponse, 
    status_code=status.HTTP_201_CREATED
)
def create_activity_log(log_in: ActivityLogCreate):
    """
    Registra un evento o acción realizada por el usuario en el sistema.
    Ideal para auditoría (Métrica de calidad).
    """
    log_data = log_in.model_dump() 
    
    result = mongo_db.activity_logs.insert_one(log_data)
    
    inserted_log = mongo_db.activity_logs.find_one({"_id": result.inserted_id})
    inserted_log["_id"] = str(inserted_log["_id"])
    
    return inserted_log


@router.get("/activity-logs", response_model=List[ActivityLogResponse])
def get_activity_logs():
    """Obtiene el historial completo de logs de auditoría."""
    logs = list(mongo_db.activity_logs.find())
    
    for log in logs:
        log["_id"] = str(log["_id"])
        
    return logs


@router.post(
    "/study-sessions", 
    response_model=StudySessionResponse, 
    status_code=status.HTTP_201_CREATED
)
def create_study_session(session_in: StudySessionCreate):
    """Registra una nueva sesión de estudio realizada por un estudiante."""
    session_data = session_in.model_dump()
    
    result = mongo_db.study_sessions.insert_one(session_data)
    
    inserted_session = mongo_db.study_sessions.find_one({"_id": result.inserted_id})
    inserted_session["_id"] = str(inserted_session["_id"])
    
    return inserted_session


@router.get("/study-sessions", response_model=List[StudySessionResponse])
def get_study_sessions():
    """Obtiene todas las sesiones de estudio registradas."""
    sessions = list(mongo_db.study_sessions.find())
    
    for session in sessions:
        session["_id"] = str(session["_id"])
        
    return sessions

@router.delete("/study-sessions/{session_id}")
def delete_study_session(session_id: str):

    mongo_db.study_sessions.delete_one({
        "_id": ObjectId(session_id)
    })

    return {
        "message": "Study session eliminada"
    }

@router.post("/flashcards")
def create_flashcard(card: FlashcardCreate):

    card_data = card.model_dump()

    result = mongo_db.flashcards.insert_one(card_data)

    created = mongo_db.flashcards.find_one({
        "_id": result.inserted_id
    })

    created["_id"] = str(created["_id"])

    return created
@router.get("/flashcards")
def get_flashcards():

    cards = list(mongo_db.flashcards.find())

    for card in cards:
        card["_id"] = str(card["_id"])

    return cards


@router.post("/notifications")
def create_notification(notification: NotificationCreate):

    data = notification.model_dump()

    result = mongo_db.notifications.insert_one(data)

    created = mongo_db.notifications.find_one({
        "_id": result.inserted_id
    })

    created["_id"] = str(created["_id"])

    return created

@router.get("/notifications")
def get_notifications():
    notifications = list(mongo_db.notifications.find())

    for item in notifications:
        item["_id"] = str(item["_id"])

    return notifications


@router.delete("/notifications/{notification_id}")
def delete_notification(notification_id: str):
    mongo_db.notifications.delete_one({"_id": ObjectId(notification_id)})

    return {"message": "Notificación eliminada"}


@router.post("/study-goals")
def create_study_goal(goal: StudyGoalCreate):
    data = goal.model_dump()
    result = mongo_db.study_goals.insert_one(data)

    created = mongo_db.study_goals.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])

    return created


@router.get("/study-goals")
def get_study_goals():
    goals = list(mongo_db.study_goals.find())

    for item in goals:
        item["_id"] = str(item["_id"])

    return goals


@router.delete("/study-goals/{goal_id}")
def delete_study_goal(goal_id: str):
    mongo_db.study_goals.delete_one({"_id": ObjectId(goal_id)})

    return {"message": "Meta eliminada"}


@router.post("/resources")
def create_resource(resource: ResourceCreate):
    data = resource.model_dump()
    result = mongo_db.resources.insert_one(data)

    created = mongo_db.resources.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])

    return created


@router.get("/resources")
def get_resources():
    resources = list(mongo_db.resources.find())

    for item in resources:
        item["_id"] = str(item["_id"])

    return resources


@router.delete("/flashcards/{flashcard_id}")
def delete_flashcard(flashcard_id: str):

    mongo_db.flashcards.delete_one({
        "_id": ObjectId(flashcard_id)
    })

    return {
        "message": "Flashcard eliminada"
    }