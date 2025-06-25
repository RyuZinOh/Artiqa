from fastapi import Depends, HTTPException, status
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
    
def get_admin_token(token:str =  Depends(owo_auth)):
    try:
        payload = verify_token(token)
        if not payload.get("is_admin", "False"):
            raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="You are not admin"    
        )
        return payload
    except HTTPException as e:
        raise e
    

## disect three for artist
def get_artist_token(token:str = Depends(owo_auth)):
    try:
        payload = verify_token(token)
        if not payload.get("is_artist", "False"):
            raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="You are not artist"    
        )
        return payload
    except HTTPException as e:
        raise e





