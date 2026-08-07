from pydantic import BaseModel


class ScheduleCreate(BaseModel):
    course: str
    date: str
    startTime: str
    endTime: str
    topic: str
    notes: str = ""