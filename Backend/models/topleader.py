from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models import Base

class TopLeader(Base):
    __tablename__ = "top_leaders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), unique=True, nullable=False)
    weekly_wins = Column(Integer, default=0)
    engagement_points = Column(Integer, default=0)


    user = relationship("User", back_populates="top_leader")
    