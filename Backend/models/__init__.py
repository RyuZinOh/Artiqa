from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
##regestering models
from .user_model import User
from .role_model import Role
from .password_model import Password