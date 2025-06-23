from sqlalchemy import Column, Integer, String
from models import Base
from sqlalchemy.orm import relationship

class Role(Base):
    __tablename__= "roles"
    role_id  = Column(Integer, primary_key=True, autoincrement=True, index=True, nullable=False)
    role_name = Column(String(50), nullable=False)



    users = relationship("User", back_populates="role")
