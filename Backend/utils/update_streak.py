from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from models import ProfileCosmetic


def update_user_streak(user_id: int, db:Session)-> None:
    profile = db.query(ProfileCosmetic).filter(ProfileCosmetic.user_id == user_id).first()
    if not profile:
        profile = ProfileCosmetic(user_id=user_id)
        db.add(profile)
        db.commit()
        db.refresh(profile)

    today = datetime.now(timezone.utc).date()

    if profile.last_active_date:
        last_active = profile.last_active_date.date()
        if today == last_active:
            return
        elif today - last_active == timedelta(days=1):
            profile.current_streak+=1
        else:
            profile.current_streak = 1
    else:
        profile.current_streak = 1

    profile.last_active_date  =datetime.now(timezone.utc)

    profile.level = 1 + profile.current_streak // 10

    profile.progress  = (profile.current_streak % 10)/10

    db.commit()