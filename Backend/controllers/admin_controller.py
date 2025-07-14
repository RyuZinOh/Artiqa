from fastapi import HTTPException
from sqlalchemy.orm import Session
from controllers.user_controller import ROLENAMETOID
from models import User, RoleRequest
from schemas import  RoleFixed




#first thing-> admin has done important here which is approving the pending artist role reqest approval
def approve_role_change(request_id: int, payload: dict, db:Session)->dict:
    admin_uid = payload.get("id")
    admin_user = db.query(User).filter(User.id == admin_uid).first()

    if not admin_user or admin_user.role_id != ROLENAMETOID[RoleFixed.superuser]:
        raise HTTPException(status_code=403,detail="Only Admin can Approve!")

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












