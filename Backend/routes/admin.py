from fastapi import APIRouter, Depends
from utils.dependencies import get_admin_token



router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/testadmin")
def check_admin(payload=Depends(get_admin_token)):
    return f"hi admin, u can do!{payload}"