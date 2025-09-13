from fastapi import APIRouter, Depends, UploadFile, Form
from utils.dependencies import get_artist_token
from sqlalchemy.orm import Session
from database import get_db
from controllers import artist_controller
from schemas import ArtOut



router = APIRouter(
    prefix="/artists",
    tags=["Artists"]
)

@router.get("/testartist")
def check_artist(payload=Depends(get_artist_token)):
    return f"hi artist, u can do art related stuff"



@router.post("/upload", response_model=ArtOut)
async def upload_art_route(
    file: UploadFile,
    description: str = Form(...),
    status_str: str = Form("draft"),
    visibility: str = Form("public"),
    is_competing: bool = Form(False),
    payload = Depends(get_artist_token),
    db: Session=  Depends(get_db)
):
    return await artist_controller.upload_art(
        payload, file, description, status_str, visibility, is_competing, db
    )