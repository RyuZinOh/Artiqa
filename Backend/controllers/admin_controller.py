from fastapi import HTTPException,UploadFile
from sqlalchemy.orm import Session
from controllers.user_controller import ROLENAMETOID
from models import User, RoleRequest, Asset
from schemas import  RoleFixed
import os
from dotenv import load_dotenv


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
    role_req = db.query(RoleRequest).filter(RoleRequest.user_id == request_id).first()


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












