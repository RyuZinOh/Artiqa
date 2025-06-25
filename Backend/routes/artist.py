from fastapi import APIRouter, Depends
from utils.dependencies import get_artist_token


router = APIRouter(
    prefix="/artists",
    tags=["Artists"]
)

@router.get("/testartist")
def check_artist(payload=Depends(get_artist_token)):
    return f"hi artist, u can do art related stuff"