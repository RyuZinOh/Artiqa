from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from models import User, Password, RoleRequest, ProfileCosmetic
from schemas import UserCreate, UserOut, RoleFixed, loginFormat, ForgetPasswordVerify, ForgetPasswordReset
from utils.hashing import get_pwd_hash, verify_password
from database import get_db
from utils.jwt_token import create_token, password_token_create, password_token_verfiy
import os
from shutil import copyfileobj
import time



A_F = os.getenv("ARTS_PATH")
BASE_PATH = os.getenv("ARTIQA_BASE")


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
        speciality = request.speciality,
        gender = request.gender,
        password_id = new_password.password_id,
        role_id  =  ROLENAMETOID[RoleFixed.user],
    )

    

    db.add(new_user)
    db.commit()
    db.refresh(new_user)



    ##creating a folder for user
    ufp = os.path.join(A_F, new_user.username)
    folder_created = False
    try: 
        os.makedirs(ufp, exist_ok=True)
        folder_created = True

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create user folder:{str(e)}"
        )    
    user_out  = UserOut.model_validate(new_user)
    user_out.folder_usernme = folder_created

    return user_out






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
        "is_admin": user.role_id ==ROLENAMETOID[RoleFixed.superuser],
        "is_artist": user.role_id == ROLENAMETOID[RoleFixed.artist],
        "is_user": user.role_id == ROLENAMETOID[RoleFixed.user]
    }

    



##generate the token after verify for password reset
def verify_user_forget(data:ForgetPasswordVerify, db:Session):
    user = db.query(User).filter(data.email  == User.email).first()
    if not user:
        raise HTTPException(status_code=404, detail= "user not available")
    password_obj = db.query(Password).filter(Password.password_id == user.password_id).first()
    
    if not password_obj or password_obj.fav_food.lower() !=data.fav_food.lower():
        raise HTTPException(status_code=400, detail= "password or the fav food isn't matching")
    
    token = password_token_create(user.email)
    return{
        "success" : "OK",
        "reset_token": token
    } 
        


def reset_password(token:str, data:ForgetPasswordReset, db:Session):
    email = password_token_verfiy(token)
    user = db.query(User).filter(email == User.email).first()

    if not user:
        raise HTTPException(status_code=404, detail= "user not available")
    password_obj = db.query(Password).filter(Password.password_id == user.password_id).first()
    password_obj.password_hash = get_pwd_hash(data.new_password)
    db.commit()
    return{
        "success": "ok"
    }
    
    


## send the request for artist change
def request_role_change(payload: dict, db:Session, message: str = None)->dict:
    user_id = payload.get("id")
    user = db.query(User).filter(User.id== user_id).first()

    if not user or user.role_id != ROLENAMETOID[RoleFixed.user]:
        raise HTTPException(status_code=400, detail="only user can request to change his/her role!")

    existing_user = db.query(RoleRequest).filter(
            RoleRequest.user_id ==user.id,
            RoleRequest.requested_role == RoleFixed.artist,
            RoleRequest.is_approved == False
    ).first()


    if existing_user:
        raise HTTPException(status_code=400, detail="you already sent, wait for the approval!")

    new_request = RoleRequest(user_id=user.id, requested_role=RoleFixed.artist, message = message)

    db.add(new_request)
    db.commit()
    db.refresh(new_request)


    return{
            "message": "Artist role reqest successfully sent!"
    }


    

    




    


## getting public profile

def get_p_profile(username: str, db: Session):
    
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user not found"
        )
    is_artist = user.role_id == ROLENAMETOID[RoleFixed.artist]
    if user.role_id != ROLENAMETOID[RoleFixed.artist]:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="not an artist"
        )
    
    profile_cos = db.query(ProfileCosmetic).filter(ProfileCosmetic.user_id ==  user.id).first()
    if not profile_cos:
        profile_cos = ProfileCosmetic(user_id = user.id)
        db.add(profile_cos)
        db.commit()
        db.refresh(profile_cos)



    profile_data = {
        "username": user.username,
        "full_name": user.full_name,
        "profile_picture": user.profile_pic,
        "email": user.email,
        "speciality":user.speciality,
        "nationality": user.nationality,
        "biography": user.biography,
        "selected_background": profile_cos.selected_bg,
        "selected_card": profile_cos.selected_card,
        "badges": profile_cos.badges or [],
        "joined_date": user.joined_date,
        "is_artist": is_artist
    }    

    return profile_data



##updating in chunks
##profile_pic
def update_user_avatar(user_id: int, file:str, db: Session):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    

    fd = os.path.join(A_F, user.username)
    if not os.path.exists(fd):
        os.makedirs(fd, exist_ok=True)

    ext = os.path.splitext(file.filename)[1]
    timestamp = int(time.time())
    new_filename = f"avatar_{timestamp}{ext}"
    new_path= os.path.join(fd, new_filename)

    for e in os.listdir(fd):
        if e.startswith("avatar_"):
            os.remove(os.path.join(fd, e))

    with open(new_path, "wb") as buffer:
        copyfileobj(file.file, buffer)


    relative_path = os.path.relpath(new_path, BASE_PATH).replace("\\","/")
        
    
    user.profile_pic = relative_path
    db.commit()
    db.refresh(user)

    return {
        "msg": "profile picture updated success",
        "profile_pic": user.profile_pic,
        "user": UserOut.model_validate(user)
    }

#->getting thepfp
def get_pfp(payload: dict, db: Session):
    if not payload:
        raise HTTPException(status_code=401, detail=" not authorized")
    
    user  = db.query(User).filter(User.id == payload["id"]).first()

    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    
    return {
        "profile_pic": user.profile_pic
    }

##email
def update_user_email(user_id: int, email: str, db: Session):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    existing = db.query(User).filter(User.email == email, User.id != user_id).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already in use")
    

    user.email = email
    db.commit()
    db.refresh(user)

    return{
        "msg": "email updated success",
        "email": user.email
    }

##full_name
def update_full_name(user_id: int, full_name: str, db: Session):
    user  = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.full_name = full_name       
    db.commit()
    db.refresh(user)

    return{
        "msg":"full name updated success",
            "full_name": user.full_name 
    }

#password
def update_password(user_id: int, old_password: str, new_password: str, db: Session):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    pass_obj = db.query(Password).filter(Password.password_id == user.password_id).first()
    if not pass_obj:
        raise HTTPException(status_code=404, detail="Password not found")
    
    if not verify_password(old_password, pass_obj.password_hash):
        raise HTTPException(status_code=401, detail="old  password is incorrect")
    
    pass_obj.password_hash = get_pwd_hash(new_password)
    db.commit()
    db.refresh(pass_obj)

    return{
        "msg": "password update success"
    }



    
