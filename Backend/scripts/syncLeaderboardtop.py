from sqlalchemy.orm import Session
from database import get_db
from models import User, Art, Competition, TopLeader, Heart, Critique

def sync_top_leaders():
    db: Session = next(get_db())
    users = db.query(User).all()

    for u in users:
        ##counting wins
        wins_count = (
            db.query(Competition).join(Art, Art.art_id == Competition.winner_art_id).filter(Art.user_id == u.id).count()
        )
        
        ##getting ids of all arts
        arts_ids = [art.art_id for art in u.arts]
        engagement_points = 0

        if arts_ids:
            hearts_count = db.query(Heart).filter(Heart.art_id.in_(arts_ids)).count()
            critiqus_count = db.query(Critique).filter(Critique.art_id.in_(arts_ids)).count()
            engagement_points = hearts_count + critiqus_count

          ##fetching the existing topper of the leader
        top_leader = db.query(TopLeader).filter(TopLeader.user_id == u.id).first()
        if not top_leader:
            top_leader = TopLeader(user_id=u.id, weekly_wins = wins_count, engagement_points=engagement_points)
            db.add(top_leader)
        else:
            top_leader.weekly_wins = wins_count
            top_leader.engagement_points = engagement_points

        db.commit()

    print("topleader table synced success")

if __name__ ==  "__main__":
    sync_top_leaders()


