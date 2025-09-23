from  fastapi import APIRouter, WebSocket, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from utils.websocket_manager import manager
from utils.dependencies import get_user_from_token
from database import get_db
from controllers import notification_controller
from schemas import NotificationCreate
from models import User
router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = Query(...)):
    user = get_user_from_token(token)
    user_id = user["id"]

    await manager.connect(user_id, websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception as e:
        print(f"Websocket disconnected: {e}")
    finally:
        manager.disconnect(user_id, websocket)



##listing all notification for current user
@router.get("/")
def get_notifications(user= Depends(get_user_from_token), db: Session = Depends(get_db)):
    return notification_controller.list_notification(db, user["id"])


## creating
@router.post("/create")
async def create_notification(data: NotificationCreate, db: Session = Depends(get_db), current_user : dict = Depends(get_user_from_token)):
    sender  = db.query(User).filter(User.id == current_user["id"]).first()

    notif = await notification_controller.create_notification(
        db=db, user_id=data.user_id, sender=sender,title=data.title, message=data.message
    )

    return notif


##maring
@router.post("/read-all")
def mark_all_notifications_read(user=Depends(get_user_from_token), db: Session = Depends(get_db)):
    notifs = notification_controller.mark_all_as_read(db, user["id"])
    return {"status": "success", "updated_count": len(notifs)}

