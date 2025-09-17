from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from models import Base

art_artist_tags = Table(
    "art_artist_tags",
    Base.metadata,
    Column("art_id", Integer, ForeignKey("arts.art_id", ondelete="CASCADE"), primary_key=True),
    Column("artist_tag_id", Integer, ForeignKey("artist_tags.id", ondelete="CASCADE"), primary_key=True)
)

class ArtistTag(Base):
    __tablename__ = "artist_tags"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    name = Column(String(100), nullable=False)

    arts = relationship("Art", secondary=art_artist_tags, back_populates="artist_tags")
    artist = relationship("User", back_populates="artist_tags")
