from sqlalchemy import Column, Integer, String, Table, ForeignKey
from  sqlalchemy.orm import relationship
from models import Base


art_tags = Table(
    "art_tags",
    Base.metadata,
    Column("art_id", Integer, ForeignKey("arts.art_id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)
)


class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    arts = relationship("Art", secondary=art_tags, back_populates="global_tags")