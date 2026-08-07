from pydantic import BaseModel


class MaterialCreate(BaseModel):
    title: str
    course: str
    url: str = ""
    description: str = ""