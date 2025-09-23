from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime, timezone
from models import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    speciality = Column(String(50), nullable=True)
    full_name = Column(String(100))
    profile_pic = Column(String(255), nullable=True)

    nationality = Column(String(50))
    biography = Column(String(500))
    gender = Column(String(25))
    email = Column(String(100), unique=True, nullable=False)
    joined_date = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    is_verified = Column(Boolean, default=False)

    password_id = Column(Integer, ForeignKey("passwords.password_id"), nullable=False)
    role_id   = Column(Integer, ForeignKey("roles.role_id"), nullable=False)
    password = relationship("Password", back_populates="user")
    role  =  relationship("Role", back_populates="users")

    role_requests =  relationship("RoleRequest", back_populates="user")
    arts = relationship("Art", back_populates="artist", cascade="all, delete-orphan")
    hearts = relationship("Heart", back_populates="user", cascade="all, delete-orphan")
    critiques = relationship("Critique", back_populates="user", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="user", cascade="all, delete-orphan")
    artist_tags = relationship("ArtistTag", back_populates="artist", cascade="all, delete-orphan")
    profile_cosmetic =  relationship("ProfileCosmetic", back_populates="user", cascade="all, delete-orphan", uselist=False)
    top_leader = relationship("TopLeader", back_populates="user", uselist=False)
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan", foreign_keys="Notification.user_id")



    is_banned = Column(Boolean, default=False)
    banned_until = Column(DateTime(timezone=True), nullable=True)
    ban_reason = Column(String(255), nullable=True)





 



