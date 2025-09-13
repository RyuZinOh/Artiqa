from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime, String
from datetime import datetime, timezone
from sqlalchemy.orm import relationship
from models import Base


class Report(Base):
    __tablename__ = "reports"

    report_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    art_id = Column(Integer, ForeignKey("arts.art_id"), nullable=False)

    reason = Column(String(255), nullable=False)
    reported_at = Column(DateTime(timezone=True), default=lambda:datetime.now(timezone.utc))

    art = relationship("Art", back_populates="reports")
    user = relationship("User", back_populates="reports")
