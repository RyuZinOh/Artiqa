from datetime import datetime, timedelta, timezone
import jwt 
from dotenv import load_dotenv
from fastapi import HTTPException
import os


load_dotenv()

S_K = os.getenv("SECRET_KEY")
ALGO = os.getenv("ALGORITHM")
EXPIRATION = int(os.getenv("TOKEN_EXPIRATION"))


##creating JWT TOKEN
def create_token(username:str, user_id:int, role_id:int)->str:
    payload = {
        "sub": username,
        "id": user_id,
        "role_id":role_id,
        "is_admin": role_id == 69,
        "exp": datetime.now(timezone.utc) + timedelta(days=EXPIRATION)
    }
    return jwt.encode(payload, S_K, algorithm=ALGO)


#verifying JWT TOKEN
def verify_token(token:str)->dict:
    try:
        return jwt.decode(token, S_K, algorithms=[ALGO])
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token expired")
    except jwt.exceptions.InvalidTokenError:
        raise HTTPException(status_code=401, detail="invalid token")






