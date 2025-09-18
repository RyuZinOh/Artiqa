from pydantic import BaseModel

class ForgetPasswordVerify(BaseModel):
    email: str 
    fav_food : str

class ForgetPasswordReset(BaseModel):
    new_password : str    



class PasswordChange(BaseModel):
    old_password : str
    new_password: str
    
     





