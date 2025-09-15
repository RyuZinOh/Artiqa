from fastapi import APIRouter, Depends, UploadFile, Form
from utils.dependencies import get_artist_token, get_user_from_token
from sqlalchemy.orm import Session
from database import get_db
from controllers import artist_controller
from schemas import ArtOut, CritiqueOut, CritiqueCreate, ReportCreate  , ReportOut
from typing import List


router = APIRouter(
    prefix="/artists",
    tags=["Artists"]
)

@router.get("/testartist")
def check_artist(payload=Depends(get_artist_token)):
    return f"hi artist, u can do art related stuff"


###getting arts
#all
@router.get("/all-arts", response_model=List[ArtOut])
def get_all_arts(db: Session = Depends(get_db)):
    return artist_controller.get_all_arts(db)

#by id
@router.get("/art/{art_id}", response_model=ArtOut)
def get_art(art_id: int,
    payload = Depends(get_user_from_token),
             db: Session = Depends(get_db)):
    cur_id = payload.get("id") if payload else None
    return artist_controller.get_arts_by_id(art_id, db, cur_id)


##through artists
#Mine [artist itself]
@router.get("/arts/mine", response_model=List[ArtOut])
def get_my_arts(payload=Depends(get_artist_token), db: Session  = Depends(get_db)):
    return artist_controller.get_my_arts(payload, db)

#artist -> uploading art
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

#critiqes giving to a specific art
@router.post("/art/{art_id}/critique", response_model=CritiqueOut)
def critquing(art_id: int,
               critique_in: CritiqueCreate,
               payload=Depends(get_user_from_token),
               db: Session = Depends(get_db)
               ):
    
    return artist_controller.add_critique(art_id, payload, critique_in, db)


##hearing the arts
@router.post("/art/{art_id}/heart")
def hearting(
    art_id: int,
               payload=Depends(get_user_from_token),
               db: Session = Depends(get_db)
            ):
    return artist_controller.add_heart(art_id, payload, db)


##placeholder ->[unhearting]



#reporting the arts
@router.post("/art/{art_id}/report", response_model=ReportOut)
def reporting(art_id: int,
               report_in: ReportCreate,
               payload=Depends(get_user_from_token),
               db: Session = Depends(get_db)
               ):
    
    return artist_controller.add_report(art_id, payload, report_in, db)









