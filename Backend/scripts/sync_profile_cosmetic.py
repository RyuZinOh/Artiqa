from sqlalchemy.orm import Session
from database import get_db
from models import User, ProfileCosmetic, Art
from models import Competition

def sync_profile_stats():
    db: Session = next(get_db())
    users= db.query(User).all()

    

    for u in users:
        profile = db.query(ProfileCosmetic).filter(ProfileCosmetic.user_id == u.id).first()
        if not profile:
            profile = ProfileCosmetic(user_id=u.id)
            db.add(profile)
            db.commit()
            db.refresh(profile)

        profile.total_arts = db.query(Art).filter(Art.user_id == u.id).count()

        total_wins = db.query(Competition).join(Art, Art.art_id == Competition.winner_art_id).filter(Art.user_id == u.id).count()

        profile.total_wins = total_wins

        db.commit()


if __name__ == "__main__":
    sync_profile_stats()
    print("profile cosmetics synced") 