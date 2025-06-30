from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from models import User, Password
from schemas import UserCreate, UserOut, RoleFixed, loginFormat
from utils.hashing import get_pwd_hash, verify_password
from database import get_db
from utils.jwt_token import create_token


## defining their for roles
ROLENAMETOID ={
    RoleFixed.superuser : 69,
    RoleFixed.artist : 699,
    RoleFixed.user : 6999
}



def register_user(request: UserCreate, db:Session =  Depends(get_db))->UserOut:
    existing_user = db.query(User).filter((User.username == request.username)|(User.email == request.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="username or email already exists"
        )
    
    new_password = Password(
        password_hash = get_pwd_hash(request.password),
        fav_food = request.fav_food
    )
    db.add(new_password)
    db.commit()
    db.refresh(new_password)
    
    new_user =  User(
        username = request.username,
        full_name = request.full_name,
        email = request.email,
        biography = request.biography,
        profile_pic = request.profile_pic,
        nationality = request.nationality,
        gender = request.gender,
        password_id = new_password.password_id,
        role_id  =  ROLENAMETOID[RoleFixed.user],
    )

    

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return UserOut.model_validate(new_user)






# loggin in user
def login_user (request:loginFormat, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username ==  request.username).first()
## don't use class parameter
    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Invalid User or Email"
        )
    is_artist = user.role_id == 699
    is_admin = user.role_id == 69

    password_obj = db.query(Password).filter(Password.password_id == user.password_id).first()

    if not password_obj or not verify_password(request.password, password_obj.password_hash):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Invalid User or Email"    
        )
    
    token = create_token(
        username = user.username,
        user_id = user.id,
        role_id  = user.role_id,
    )

    return {
        "status" : f"You are Successfully Logged in {user.username}",
        "auth": token,
        "is_admin": is_admin,
        "is_artist": is_artist
    }





## getting the user data
def get_user_data(payload:dict, db:Session)->dict:
    
    user_id = payload.get("id")

    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid payload")
    

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    

    return{
        "user": UserOut.model_validate(user),
        "is_admin": user.role_id == RoleFixed.superuser,
        "is_artist": user.role_id == RoleFixed.artist,
        "is_user": user.role_id == RoleFixed.user
    }

    


    



