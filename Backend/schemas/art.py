from pydantic import BaseModel
from typing import Optional
from datetime import datetime

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

    model_config={
        "from_attributes": True
    }