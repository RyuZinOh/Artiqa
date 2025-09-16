from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from models import Base

class ProfileCosmetic(Base):
    __tablename__ = "profile_cosmetics"


    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False, unique=True)

    selected_bg = Column(String(255), nullable=True)
    selected_card = Column(String(255), nullable=True)
    badges = Column(JSON, default=[])


    total_arts = Column(Integer, default=0)
    total_wins = Column(Integer, default=0)
    current_streak = Column(Integer, default=0)
    last_active_date = Column(DateTime(timezone=True), nullable=True)
    level = Column(Integer, default=1)
    progress = Column(Float, default=0.0)
    recent_victories = Column(JSON, default=[])


    user = relationship("User", back_populates="profile_cosmetic")


    created_at = Column(DateTime(timezone=True), default=lambda:datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda:datetime.now(timezone.utc), onupdate=lambda:datetime.now(timezone.utc))
