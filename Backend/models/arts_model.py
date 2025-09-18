from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from models import Base
from models.tags_model import art_tags
from models.artisttags_model import art_artist_tags
from models.competition_model import competition_art_link

class Art(Base):
    __tablename__ = "arts"
    art_id = Column(Integer, primary_key=True, index=True)
    user_id  = Column(Integer, ForeignKey("user.id"), nullable=False)

    image_name = Column(String(255), nullable=False)
    image_url = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(200), default="draft")
    visibility = Column(String(200), default="public")
    upload_date = Column(DateTime(timezone=True), default=lambda:datetime.now(timezone.utc))
    is_competing = Column(Boolean, default=False)
    
    
    artist = relationship("User", back_populates="arts")
    hearts = relationship("Heart", back_populates="art", cascade="all, delete-orphan")
    critiques =  relationship("Critique", back_populates="art", cascade="all, delete-orphan")
    reports  =  relationship("Report", back_populates="art", cascade="all, delete-orphan")
    global_tags = relationship("Tag", secondary=art_tags, back_populates="arts")
    artist_tags = relationship("ArtistTag", secondary=art_artist_tags, back_populates="arts")


    competitions =relationship(
        "Competition",
        secondary=competition_art_link,
        back_populates="participating_arts"
    )




