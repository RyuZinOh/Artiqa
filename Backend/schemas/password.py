from pydantic import BaseModel

class ForgetPasswordCreate(BaseModel):
    email: str 
    fav_food = str 

