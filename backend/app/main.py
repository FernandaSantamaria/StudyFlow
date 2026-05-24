from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.postgresql import engine
from app.database.postgresql import Base

from app.models.user_model import User
from app.models.task_model import Task
from app.models.subject_model import Subject
from app.models.note_model import Note
from app.models.reminder_model import Reminder
from app.models.task_category_model import TaskCategory


from app.routes.user_routes import router as user_router
from app.routes.task_routes import router as task_router
from app.routes.subject_routes import router as subject_router
from app.routes.note_routes import router as note_router
from app.routes.reminder_routes import router as reminder_router
from app.routes.task_category_routes import router as task_category_router
from app.routes.mongo_routes import router as mongo_router

from app.database.mongodb import mongo_db


app = FastAPI()
app.include_router(user_router)
app.include_router(task_router)
app.include_router(subject_router)
app.include_router(note_router)
app.include_router(reminder_router)
app.include_router(task_category_router)
app.include_router(mongo_router)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "StudyFlow API funcionando"}


@app.get("/mongo-test")
def mongo_test():

    collections = mongo_db.list_collection_names()

    return {
        "mongo_status": "MongoDB conectado",
        "collections": collections
    }