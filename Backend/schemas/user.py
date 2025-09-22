from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


##validation stuffing [registration]
class UserCreate(BaseModel):
    username :str  = Field(...,min_length=3, max_length=25)
    full_name : Optional[str] =  None
    email : EmailStr
    password : str
    biography : Optional[str] = None
    nationality: Optional[str]
    profile_pic : Optional[str] = None
    gender: Optional[str]  = None
    role_id: Optional[int] = None
    speciality: Optional[str] = None
    fav_food: Optional[str] = None

#sends output to client
class UserOut(BaseModel):
    id: int
    username: str 
    full_name: Optional[str]
    email: EmailStr
    biography : Optional[str] 
    profile_pic : Optional[str] 
    nationality: Optional[str]
    gender: Optional[str] 
    speciality: Optional[str] = None
    is_verified: bool
    role_id: Optional[int]
    joined_date: datetime
    folder_usernme: Optional[bool] = None

    model_config  ={
        "from_attributes": True
    }



#login request
class loginFormat(BaseModel):
    username : str
    password: str

##email
class EmailUpdate(BaseModel):
    email: EmailStr
#fullname
class FullNameUpdate(BaseModel):
    full_name : str 


##requestartist
class RoleChangeRequest(BaseModel):
    message: str = None



##banniing
class BanUserRequest(BaseModel):
    duration_hours:int
    reason: str | None = None    