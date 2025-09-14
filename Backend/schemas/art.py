from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


##inputs
class CritiqueCreate(BaseModel):
    text: str

class ReportCreate(BaseModel):
    reason: str




#responses....
class CritiqueOut(BaseModel):
    critique_id: int
    user_id: int
    text: str
    created_at: datetime

    model_config={
        "from_attributes": True
    }


class ReportOut(BaseModel):
    report_id: int
    user_id: int
    reason: str
    reported_at: datetime

    model_config={
        "from_attributes": True
    }
        

class ArtOut(BaseModel):
    art_id : int
    user_id : int
    image_name: str
    image_url: str
    description: Optional[str]
    status: str
    visibility: str
    upload_date: datetime
    is_competing: bool


    critiques: List[CritiqueOut] = []
    reports: List[ReportOut] = []
    critiques_count : int = 0
    hearts_count: int = 0


    model_config={
        "from_attributes": True
    }

