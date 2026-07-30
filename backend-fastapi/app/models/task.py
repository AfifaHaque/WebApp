from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = ""
    dueDate: Optional[str] = None
    priority: Optional[str] = "medium"
    status: Optional[str] = "pending"
    tags: Optional[list[str]] = []


class TaskResponse(TaskCreate):
    id: str
    userId: Optional[str] = None
    createdAt: datetime