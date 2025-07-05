from pydantic import BaseModel

class ForgetPasswordVerify(BaseModel):
    email: str 
    fav_food : str

class ForgetPasswordReset(BaseModel):
    new_password : str    

    
     





