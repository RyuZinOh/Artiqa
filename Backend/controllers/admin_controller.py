from fastapi import HTTPException,UploadFile
from sqlalchemy.orm import Session
from controllers.user_controller import ROLENAMETOID
from models import User, RoleRequest, Asset, Competition, ProfileCosmetic
from schemas import  RoleFixed
import os
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta

load_dotenv()
ARTIQA_BASE = os.getenv("ARTIQA_BASE")
ASSET_PATH = os.path.join(ARTIQA_BASE, "Assets")



#first thing-> admin has done important here which is approving the pending artist role reqest approval
def approve_role_change(request_id: int, payload: dict, db:Session)->dict:
    admin_uid = payload.get("id")
    admin_user = db.query(User).filter(User.id == admin_uid).first()

    if not admin_user or admin_user.role_id != ROLENAMETOID[RoleFixed.superuser]:
        raise HTTPException(status_code=403,detail="Only Admin can Approve!")
    
    # instead of  the rolerequest table id, we will be using the user id for more stable connection to users
    role_req = db.query(RoleRequest).filter(RoleRequest.role_request_id == request_id).first()


    if not role_req or role_req.is_approved:
        raise HTTPException(status_code=404, detail="Request not found!")


    user = db.query(User).filter(User.id == role_req.user_id).first()


    if not user:
        raise HTTPException(status_code=404, detail="Requested user not found!")




    user.role_id = ROLENAMETOID[role_req.requested_role]
    role_req.is_approved = True
    db.commit()



    return{
            "message": f"{user.username} has been  upgraded to {role_req.requested_role}"
    }


##disapproving the request role change
def disapprove_role_change(request_id: int, payload: dict, db:Session):
    admin_uid = payload.get("id")
    admin_user = db.query(User).filter(User.id == admin_uid).first()

    if not admin_user or admin_user.role_id!=ROLENAMETOID[RoleFixed.superuser]:
        raise HTTPException(status_code=403, detail="you aint admin to do this blud")
    
    role_req = db.query(RoleRequest).filter(RoleRequest.role_request_id ==request_id).first()

    if not role_req or role_req.is_approved:
        raise HTTPException(status_code=404, detail="request not found!")
    
    user = db.query(User).filter(User.id == role_req.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="requested user not found")
    
    db.delete(role_req)
    db.commit()

    return {
        "message": f"request from {role_req.user_id} has been disapproved"
    }
    

###adding assets
async def add_assets(asset_type:str, asset_name: str, file:UploadFile, db:Session)->dict:
    if asset_type not in ["background", "card", "badge"]:
        raise HTTPException(status_code=400, detail="invalid asset type.")
    
    folder_name = asset_type + "s"
    asset_folder = os.path.join(ASSET_PATH, folder_name)
    os.makedirs(asset_folder, exist_ok=True)

    ext = os.path.splitext(file.filename)[1]
    saved_filename = f"{asset_name}{ext}"
    file_path = os.path.join(asset_folder, saved_filename)


    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)
    await file.close()   

    relative_path = f"/Assets/{folder_name}/{saved_filename}"
        
    new_asset = Asset(
        type= asset_type,
        name = asset_name,
        file_path=relative_path
    )

    db.add(new_asset)
    db.commit()
    db.refresh(new_asset)


    return{
        "message": f"{asset_type} '{asset_name}' added success",
        "asset":{
            "id": new_asset.id,
            "type": new_asset.type.value,
            "name": new_asset.name,
            "file_path": new_asset.file_path
        }
    }





##listing all the artist requests changes
def list_pending_artist_requests(payload: dict, db:Session):
    admin_uid = payload.get("id")
    admin_user = db.query(User).filter(User.id == admin_uid).first()

    if not admin_user or admin_user.role_id!=ROLENAMETOID[RoleFixed.superuser]:
        raise HTTPException(status_code=403, detail="you aint admin to do this blud")
    
    ##this will get all the requests which arent true
    pending_requests = (
        db.query(RoleRequest).filter(RoleRequest.requested_role == RoleFixed.artist, RoleRequest.is_approved == False).all()
    )

    result = []
    for req in pending_requests:
        user = db.query(User).filter(User.id == req.user_id).first()

        if user:
            result.append({
                "request_id": req.role_request_id,
                "user_id": user.id,
                "username": user.username,
                "profile_pic": user.profile_pic,
                "message": req.message
            })

    return result        




##weekly competition starter
def create_weekly(name: str, description: str, payload: dict, db:Session):
    admin_uid = payload.get("id")
    admin_user = db.query(User).filter(User.id == admin_uid).first()

    if not admin_user or admin_user.role_id!=ROLENAMETOID[RoleFixed.superuser]:
        raise HTTPException(status_code=403, detail="you aint admin to do this blud")
    

    current_active = db.query(Competition).filter(Competition.is_active == True).first()

    if current_active:
        raise HTTPException(status_code=400, detail=f"ongong competition, so cant create until that is over = {current_active.name}")
    
    start_date = datetime.now(timezone.utc)
    end_date = start_date+ timedelta(days=7)

    competition = Competition(
        name = name,
        description=description,
        start_date = start_date,
        end_date=end_date,
        is_active =True,
        winner_art_id = None
    )

    db.add(competition)
    db.commit()
    db.refresh(competition)

    return {
        "message": f"competition: {name} created",
        "competition":{
            "competition_id" : competition.competition_id,
            "name": competition.name,
            "description": competition.description,
            "start_date": competition.start_date,
            "end_date": competition.end_date,
            "is_active": competition.is_active,
            "winnder_art_id": competition.winner_art_id
        }
    }

    
# ##closing_weekly
# def close_weekly_competition(db:Session): [we will autoamtea fetwe we done with the leaderboard table]




##Managing users 
#listing
def list_all_users(payload: dict, db: Session)->list[dict]:
    admin_uid = payload.get("id")
    admin_user = db.query(User).filter(User.id == admin_uid).first()
    if not admin_user or admin_user.role_id != ROLENAMETOID[RoleFixed.superuser]:
        raise HTTPException(status_code=403, detail="Only admin can list the users in this way!")
    
    users = db.query(User).all()

    result = []
    for user in users:
        cosmetic = user.profile_cosmetic

        result.append({
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "email": user.email,
            "profile_pic": user.profile_pic,
            "nationality": user.nationality,
            "biography": user.biography,
            "gender": user.gender,
            "speciality": user.speciality,
            "is_verified": user.is_verified,
            "role_id": user.role_id,
            "joined_date": user.joined_date,
            "role_name": user.role.role_name if user.role else "n/a",
            "selected_bg": cosmetic.selected_bg if cosmetic else None,
            "selected_card": cosmetic.selected_card if cosmetic else None,
            "badges": cosmetic.badges if cosmetic else [],
            "total_arts": cosmetic.total_arts if cosmetic else 0,
            "total_wins": cosmetic.total_wins if cosmetic else 0,
            "current_streak": cosmetic.current_streak if cosmetic else 0,
            "level": cosmetic.level if cosmetic else 1,
            "progress": cosmetic.progress if cosmetic else 0.0,
            "recent_victories": cosmetic.recent_victories if cosmetic else []
 
        })
    
    return result