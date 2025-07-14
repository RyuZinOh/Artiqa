from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, declarative_base
from controllers import user_controller, admin_controller
from database import get_db
from utils.dependencies import get_admin_token, get_user_from_token



router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/testadmin")
def check_admin(payload=Depends(get_admin_token)):
    return f"hi admin, u can do!{payload}"




## accepting the role by admin
@router.post("/approve/{request_id}")
def approve_role_change(request_id:int,payload:dict = Depends(get_user_from_token), db: Session = Depends(get_db)):
    return admin_controller.approve_role_change(request_id, payload, db)


