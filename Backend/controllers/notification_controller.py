from models import Notification, User
from utils.websocket_manager import manager
from datetime import datetime, timezone
from sqlalchemy.orm import Session
import asyncio
from typing import Optional

async def create_notification(db: Session, user_id: int,sender: User, title: str, message: Optional[str] = None)-> Notification:
    new_notif = Notification(
        user_id = user_id,
        sender_id = sender.id,
        title=title,
        message=message or "",
        is_read= False,
        created_at = datetime.now(timezone.utc)
    )
    db.add(new_notif)
    db.commit()
    db.refresh(new_notif)



    asyncio.create_task(manager.send_personal_message({
        "id": new_notif.id,
        "title": new_notif.title,
        "message": new_notif.message,
        "created_at": new_notif.created_at.isoformat(),
        "is_read": new_notif.is_read,
        "username": sender.username,
        "pfp": sender.profile_pic
    }, user_id))

    return new_notif



def list_notification(db: Session, user_id: int):
    nfs = db.query(Notification).filter(Notification.user_id == user_id).order_by(Notification.created_at.desc()).all()

    return[{
        "id": n.id,
        "title": n.title,
        "message": n.message,
        "is_read": n.is_read,
        "created_at": n.created_at.isoformat(),
        "username": n.sender.username,
        "pfp": n.sender.profile_pic
 
    } for n in nfs]


def mark_all_as_read(db: Session, user_id: int):
    db.query(Notification).filter(Notification.user_id == user_id, Notification.is_read == False).update(
        {Notification.is_read: True}, synchronize_session=False
    )
    db.commit()
    return db.query(Notification).filter(Notification.user_id == user_id).all()