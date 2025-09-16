from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


##inputs
class CritiqueCreate(BaseModel):
    text: str

class ReportCreate(BaseModel):
    reason: str




##
class ArtThumb(BaseModel):
    art_id: int
    image_url:str 
    model_config={
        "from_attributes": True
    }



##
class ArtCritism(BaseModel):
    art_id: int
    image_url: str
    critiques: List[str]

    model_config ={
        "from_attributes":True
    }    
    

#responses....
class CritiqueOut(BaseModel):
    critique_id: int
    user_id: int
    text: str
    username: Optional[str] = None
    userpfp : Optional[str] = None
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
    hearted_by_user: bool


    critiques: List[CritiqueOut] = []
    reports: List[ReportOut] = []
    critiques_count : int = 0
    hearts_count: int = 0


    
    username: Optional[str] = None
    profile_picture : Optional[str] = None


    model_config={
        "from_attributes": True
    }

