from fastapi import APIRouter, Depends, Query,HTTPException, Form, UploadFile
from sqlalchemy.orm import Session
from controllers import admin_controller
from database import get_db
from utils.dependencies import get_admin_token
from schemas import WeeklyCompetitionCreate, BanUserRequest



router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/testadmin")
def check_admin(payload=Depends(get_admin_token)):
    return f"hi admin, u can do!{payload}"




## accepting the role by admin
@router.post("/approve/{request_id}")
def approve_role_change(request_id:int,payload:dict = Depends(get_admin_token), db: Session = Depends(get_db)):
    return admin_controller.approve_role_change(request_id, payload, db)


## disapproving
@router.delete("/disapprove/{request_id}")
def disapprove_role_change(request_id:int,payload:dict = Depends(get_admin_token), db: Session = Depends(get_db)):
    return admin_controller.disapprove_role_change(request_id, payload, db)


##listing all penders
@router.get("/artist-requests")
def get_requsts(payload:dict = Depends(get_admin_token), db: Session = Depends(get_db)):
    return admin_controller.list_pending_artist_requests( payload, db)



##adding assets
@router.post("/add-asset")
async def add_asset_route(
    asset_type: str = Form(...),
    asset_name: str = Form(...),
    file:  UploadFile = None,
    payload = Depends(get_admin_token),
    db:Session=Depends(get_db)
):
    if not file:
        raise HTTPException(
            status_code=400, detail="file is required"
       )
    
    return await admin_controller.add_assets(asset_type,asset_name, file, db)






##creating competition
@router.post("/create-weekly")
def create_weekly_competition(
    payload: dict = Depends(get_admin_token),
    db: Session = Depends(get_db),
    data: WeeklyCompetitionCreate = None
):
    return admin_controller.create_weekly(data.name, data.description, payload, db)



##MANAGING USRES
##listing
@router.get("/users")
def get_all_users(payload: dict = Depends(get_admin_token),
    db: Session = Depends(get_db),
):
    return admin_controller.list_all_users(payload, db)

##banning
@router.post("/ban/{user_id}")
def ban_user(
    user_id: int,
    payload: BanUserRequest,
    admin_payload:dict = Depends(get_admin_token),
    db: Session = Depends(get_db)
):
    return admin_controller.ban_user(
        user_id=user_id,
        duration_hours=payload.duration_hours,
        reason=payload.reason,
        admin_payload = admin_payload,
        db=db)

##unbanning
@router.post("/unban/{user_id}")
def ban_user(
    user_id: int,
    admin_payload: dict= Depends(get_admin_token),
    db: Session = Depends(get_db)
):
    return admin_controller.unban_user(user_id=user_id,admin_payload=admin_payload, db=db)



##MANAGING ARTS
##listing
@router.get("/arts")
def get_all_arts(
    skip: int = 0,
    limit: int = 20,
    payload: dict = Depends(get_admin_token),
    db: Session = Depends(get_db),
):
    return admin_controller.list_all_arts(payload, db, skip=skip, limit=limit)


##deleting
@router.delete("/arts/{art_id}")
def delete_art(
    art_id: int,
    payload: dict = Depends(get_admin_token),
    db: Session  = Depends(get_db)
):
    return admin_controller.delete_art(art_id, payload, db)