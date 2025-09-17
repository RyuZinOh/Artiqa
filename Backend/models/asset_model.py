from sqlalchemy import Column, Integer, String, Enum, DateTime
from datetime import timezone, datetime
from models import Base
import enum

class AssetType(str, enum.Enum):
    background = "background"
    card = "card"
    badge = "badge"

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(AssetType), nullable=False)
    name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    created_at  =Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


    def __repr__(self):
        return f"<Asset(name={self.name}), type={self.type}"
