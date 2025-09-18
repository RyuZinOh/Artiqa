from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Table
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from models import Base

competition_art_link = Table(
        "competition_art_link",
        Base.metadata, 
        Column("competition_id", Integer, ForeignKey("competitions.competition_id")),
        Column("art_id", Integer, ForeignKey("arts.art_id"))
    )

class Competition(Base):
    __tablename__="competitions"
    competition_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    start_date = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    end_date = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    winner_art_id = Column(Integer, ForeignKey("arts.art_id"), nullable=True)

    winner_art = relationship("Art", foreign_keys=[winner_art_id])
    participating_arts = relationship(
        "Art",
        secondary="competition_art_link",
        back_populates="competitions"
    )

    



