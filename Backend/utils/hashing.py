from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_pwd_hash(password: str)->str:
    return pwd_context.hash(password)


# verify using the passlib library
def verify_password(plain: str, hashed: str)->bool:
    return pwd_context.verify(plain, hashed)