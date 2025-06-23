from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from utils.jwt_token import verify_token
 
owo_auth  = OAuth2PasswordBearer(tokenUrl="/users/login/")


#This checks the aunthetication and matches throught the verify function 
def get_user_from_token(token:str = Depends(owo_auth)):
    try:
       payload = verify_token(token)
       return payload
    except HTTPException as e:
        raise e



