from enum import Enum

from pydantic import BaseModel
from typing import Optional

class TaskStatus(str, Enum):
    todo = 'todo'
    in_progress = 'in_progress'
    completed = 'completed'


class TaskPriority(str, Enum):
    low = 'low'
    medium = 'medium'
    high = 'high'

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[str] = None
    status: TaskStatus
    priority: TaskPriority



class NoteBase(BaseModel):
    title: str
    content: Optional[str]
    task: Optional[int] = None
    status: bool