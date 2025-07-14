from sqlalchemy  import Column, Integer, Boolean, ForeignKey, DateTime, Enum as esx, collate
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from models import Base
from schemas import RoleFixed

class RoleRequest(Base):
    __tablename__ = "role_requests"
    role_request_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    requested_role = Column(esx(RoleFixed), nullable=False)
    requested_at = Column(DateTime(timezone=True),  default=lambda: datetime.now(timezone.utc))
    is_approved = Column(Boolean, default=False)


    user = relationship("User", back_populates="role_requests")
