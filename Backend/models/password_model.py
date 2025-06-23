from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime, timezone
from models import Base
from sqlalchemy.orm import relationship

class Password(Base):
    __tablename__ = "passwords"

    password_id = Column(Integer, primary_key=True, index=True)
    password_hash = Column(String(255), nullable=False)
    fav_food = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="password", uselist=False)

    














