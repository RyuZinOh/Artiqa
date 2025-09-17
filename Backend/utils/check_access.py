from fastapi import status, HTTPException
from models import Art
def check_art_access(art: Art, user_id: int = None):
    if user_id is None or art.art_id!=user_id:
        if art.status!="published" or art.visibility!="public":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=" you dont have access to this art"
)