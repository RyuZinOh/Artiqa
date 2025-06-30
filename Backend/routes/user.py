from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers import user_controller 
from utils.dependencies import get_user_from_token
from database import get_db
from schemas import UserOut, UserCreate, loginFormat


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


## register
@router.post("/register",response_model=UserOut, status_code=201)
def register(request: UserCreate, db: Session  = Depends(get_db)):
    return user_controller.register_user(request, db)



##login
@router.post("/login")
def login(request:loginFormat, db: Session = Depends(get_db)):
    return user_controller.login_user(request, db)




##test
@router.get("/test")
def check_request_test(username:str= Depends(get_user_from_token)):
    return f"{username} , you are verfied , so u can do anything"




##getting the user data
@router.get("/get_data")
def get_user_data(payload:dict= Depends(get_user_from_token), db:Session = Depends(get_db)):
    return user_controller.get_user_data(payload, db)