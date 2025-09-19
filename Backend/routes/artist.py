from fastapi import APIRouter, Depends, UploadFile, Form, HTTPException
from utils.dependencies import get_artist_token, get_user_from_token, get_user_from_token_for_arts
from sqlalchemy.orm import Session
from database import get_db
from controllers import artist_controller
from schemas import ArtOut, CritiqueOut, CritiqueCreate, ReportCreate  , ReportOut, ArtThumb,ArtCritism, ArtUpdate
from typing import List, Optional


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
    payload = Depends(get_user_from_token_for_arts),
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
    image_name: str = Form(...),
    description: str = Form(...),
    status_str: str = Form("draft"),
    visibility: str = Form("public"),
    is_competing: bool = Form(False),
    tag_names: Optional[List[str]] = Form(None),
    payload = Depends(get_artist_token),
    db: Session=  Depends(get_db)
):
    return await artist_controller.upload_art(
        payload, file,description, status_str, visibility, is_competing, db, image_name , tag_names
    )

##deleting the arts
@router.delete("/delete/{art_id}", response_model=dict)
def delete_my_art(art_id: int, payload=Depends(get_artist_token), db:Session = Depends(get_db)):
    return artist_controller.delete_art(art_id, payload, db)

##updting the art
@router.patch("/update/{art_id}", response_model=ArtOut)
def update_my_art(
    art_id : int,
    art_update: ArtUpdate,
    payload =  Depends(get_artist_token),
    db: Session = Depends(get_db)
):
    return artist_controller.update_art( art_id, payload, db, art_update)

#critiqes giving to a specific art
@router.post("/art/{art_id}/critique", response_model=CritiqueOut)
def critquing(art_id: int,
               critique_in: CritiqueCreate,
               payload=Depends(get_user_from_token),
               db: Session = Depends(get_db)
               ):
    
    return artist_controller.add_critique(art_id, payload, critique_in, db)


##hearting the arts
@router.post("/art/{art_id}/heart")
def hearting(
    art_id: int,
               payload=Depends(get_user_from_token),
               db: Session = Depends(get_db)
            ):
    return artist_controller.add_heart(art_id, payload, db)

##getting all hearted by the user
@router.get("/arts/hearted", response_model=List[ArtThumb])
def get_hearted(
    payload= Depends(get_user_from_token),
    db:Session = Depends(get_db)
):
    return artist_controller.get_user_hearted_arts(payload, db)

##getting all hearted by the user
@router.get("/arts/critiqued", response_model=List[ArtCritism])
def get_hearted(
    payload= Depends(get_user_from_token),
    db:Session = Depends(get_db)
):
    return artist_controller.get_user_critiqued_arts(payload, db)





#reporting the arts
@router.post("/art/{art_id}/report", response_model=ReportOut)
def reporting(art_id: int,
               report_in: ReportCreate,
               payload=Depends(get_user_from_token),
               db: Session = Depends(get_db)
               ):
    
    return artist_controller.add_report(art_id, payload, report_in, db)





##selecting card/bg
@router.post("/profile/select-asset/{asset_id}")
def select_profile_asset(
    asset_id: int,
    asset_type: str ,
    payload= Depends(get_artist_token),
    db: Session = Depends(get_db)
):
    user_id = payload.get("id")
    return artist_controller.update_bg_c(asset_id, asset_type, user_id, db)



##getting all
@router.get("/profile/assets")
async def get_all_profile_asset(
        db:Session = Depends(get_db),
        payload = Depends(get_artist_token)
):
    return await artist_controller.list_profile_assets(db) 




##getting portfolio details
@router.get("/profile/mine")
def profile_mine(payload: dict = Depends(get_artist_token), db: Session = Depends(get_db)):
    
    return artist_controller.get_my_profile(payload, db)


##getting artists stats
@router.get("/stats/mine")
def get_my_stats(
        db: Session = Depends(get_db),
        payload: dict = Depends(get_artist_token)
):
    if not payload:
        raise HTTPException(status_code=401, detail="not authenticated as artist")
    
    user_id = payload.get("id")
    return artist_controller.get_user_stats(db, user_id)
    