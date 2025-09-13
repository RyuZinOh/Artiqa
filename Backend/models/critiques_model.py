from models import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from datetime import datetime , timezone

class Critique(Base):
    __tablename__ = "critiques"
    critique_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    art_id = Column(Integer, ForeignKey("arts.art_id"), nullable=False)


    text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda:datetime.now(timezone.utc))

    art = relationship("Art", back_populates="critiques")
    user = relationship("User", back_populates="critiques")

