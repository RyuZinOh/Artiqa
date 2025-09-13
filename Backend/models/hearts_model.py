from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from models import Base


class Heart(Base):
    __tablename__ = "hearts"
    heart_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    art_id = Column(Integer, ForeignKey("arts.art_id"), nullable=False)

    art = relationship("Art", back_populates="hearts")
    user = relationship("User", back_populates="hearts")

    __table_args__ = (UniqueConstraint("user_id", "art_id", name="unique_user_heart"),)