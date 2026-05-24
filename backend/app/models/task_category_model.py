from sqlalchemy import Column, Integer, String

from app.database.postgresql import Base


class TaskCategory(Base):

    __tablename__ = "task_categories"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)