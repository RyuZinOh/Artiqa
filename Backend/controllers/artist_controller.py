import os
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from models import Art, Critique, Heart, Report, ProfileCosmetic, Asset, User, Tag, Competition, competition_art_link, TopLeader, ArtistTag
from schemas import ArtOut, CritiqueOut, ReportOut, ArtThumb, ArtCritism, ArtUpdate
from dotenv import load_dotenv
from typing import List
from sqlalchemy.exc import IntegrityError
from utils.update_streak import update_user_streak
from utils.check_access import check_art_access
from datetime import datetime, timedelta, timezone
from sqlalchemy import func

load_dotenv()
ARTS_PATH = os.getenv("ARTS_PATH")

def serialize_art_for_output(art: Art, cur_id: int = None) -> dict:
    return {
        "art_id": art.art_id,
        "user_id": art.user_id,
        "image_name": art.image_name,
        "image_url": art.image_url,
        "description": art.description,
        "status": art.status,
        "visibility": art.visibility,
        "upload_date": art.upload_date,
        "is_competing": art.is_competing,
        "hearted_by_user": any(h.user_id == cur_id for h in art.hearts) if cur_id else False,
        "critiques_count":len(art.critiques),
        "hearts_count": len(art.hearts),
        "profile_picture": art.artist.profile_pic if art.artist else None,
        "username": art.artist.username if art.artist else None,
        "global_tags":[tag.name for tag in art.global_tags]
    }


async def upload_art(payload: dict, file: UploadFile, description: str, status_str: str, visibility: str, is_competing:bool, db: Session, image_name: str, tag_names: list[str] = None) -> ArtOut:
    if payload.get("role_id") !=699:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="only aritists!"
        )  
    
    if status_str == "draft" and visibility == "public":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drafted artworks can't be public"
        )
    
    if status_str == "published" and visibility == "private":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="published artworks can't be private"
        )
    
    if is_competing and (status_str=="draft" or visibility=="private"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="draft or private artworks can't be entered into any competition"
        ) 
    
    username = payload.get("sub")
    user_fold = os.path.join(ARTS_PATH, username, "creations")
    os.makedirs(user_fold, exist_ok=True)

    ext = os.path.splitext(file.filename)[1]
    saved_fl = f"{image_name}{ext}"
    file_path = os.path.join(user_fold, saved_fl)


    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)
    await file.close()

    relative_path = f"/Arts/{username}/creations/{saved_fl}"

    new_art = Art(
        user_id = payload.get("id"),
        image_name = image_name,
        image_url = relative_path,
        description = description,
        status = status_str,
        visibility = visibility,
        is_competing = is_competing,
    )

    global_tags =  []
    if tag_names:
        for tag_name in tag_names:
            tag = db.query(Tag).filter(Tag.name == tag_name).first()
            if not tag:
                tag = Tag(name = tag_name)
                db.add(tag)
                db.commit()
                db.refresh(tag)
            global_tags.append(tag)
    new_art.global_tags = global_tags
    
                
    try:
        db.add(new_art)
        db.commit()
        db.refresh(new_art)

        if is_competing:
            active_comp = db.query(Competition).filter(Competition.is_active == True).first()
            if not active_comp:
                db.delete(new_art)
                db.commit()
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="no ongoing compeition to join"
                )
            
            user_competing_arts = (
                db.query(Art).join(competition_art_link, Art.art_id == competition_art_link.c.art_id).filter(competition_art_link.c.competition_id == active_comp.competition_id,Art.user_id == payload.get("id")).first()
                )    
            
            if user_competing_arts:
                db.delete(new_art)
                db.commit()
                raise HTTPException(status_code=400,detail="you already competing art in the current competition")    
            
            active_comp.participating_arts.append(new_art)
            db.commit()
            db.refresh(active_comp)    

    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)    
        db.rollback()
        raise HTTPException(
            status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"failed to upload, {e}"
        )


    update_user_streak(payload.get("id"), db)
    
    return  ArtOut.model_validate(serialize_art_for_output(new_art, cur_id = payload.get("id")))






def serialize_art(art: Art, cur_id: int = None ) -> dict:
    return{
        **art.__dict__, # this one is used to unpack the dictionary else we have to explicity define everything xd
        
        "critiques":[
              {
                    "critique_id":x.critique_id,
                    "text": x.text,
                    "user_id": x.user_id,
                    "username": x.user.username if x.user else None,
                    "userpfp": x.user.profile_pic if x.user else None,
                    "created_at": x.created_at
                    }
                  for x in art.critiques
        ],
        "reports": art.reports,
        "critiques_count":len(art.critiques),
        "hearts_count": len(art.hearts),
        "profile_picture": art.artist.profile_pic if art.artist else None,
        "username": art.artist.username if art.artist else None,
        "hearted_by_user": any(h.user_id == cur_id for h in art.hearts) if cur_id  else False,
        "global_tags":[tag.name for tag in art.global_tags]

        
    }





def get_all_arts(db: Session)->List[ArtOut]:
    arts = db.query(Art).filter(
        Art.status !="draft",
        Art.visibility == "public"
    ).all()
    results = []
    for art in arts:
        results.append(ArtOut.model_validate(serialize_art(art)))
    return results    

def get_arts_by_id(art_id: int, db: Session, cid: int= None)->ArtOut:
    art = db.query(Art).filter(Art.art_id == art_id).first()
    if not art:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"art with id {art_id} not found!"
        )
    
    if cid is None or art.user_id!=cid:
        if art.status != "published" or art.visibility !="public":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this art"
            )
    
    return ArtOut.model_validate(serialize_art(art, cid))


def get_my_arts(payload: dict, db: Session)->List[ArtOut]:
    user_id = payload.get("id")
    arts = db.query(Art).filter(Art.user_id == user_id).all()
    return [serialize_art(art) for art in arts]



##critiqing
def add_critique(art_id: int, payload: dict, critique_in, db:Session)-> CritiqueOut:
    user_id = payload.get("id")
    art = db.query(Art).filter(Art.art_id == art_id).first()
    if not art:
        raise HTTPException(
            status_code=404,
            detail="Art not found"
        )
    
    check_art_access(art, user_id)
    critique = Critique(art_id=art_id, user_id=user_id, text=critique_in.text)
    db.add(critique)
    db.commit()
    db.refresh(critique)

    return CritiqueOut.model_validate({
        "critique_id": critique.critique_id,
        "text": critique.text,
        "user_id": user_id,
        "username": critique.user.username if critique.user else None,
        "userpfp": critique.user.profile_pic if critique.user else None,
        "created_at": critique.created_at
    })


## deleting my arts
def delete_art(art_id:int, payload: dict, db:Session)->dict:
    user_id  = payload.get("id")
    art = db.query(Art).filter(Art.art_id == art_id).first()

    if not art:
        raise HTTPException(
            status_code=404,
            detail="Art not found"
        )
    
    if art.user_id != user_id:
        raise HTTPException(
            status_code=403,
            detail="You can only delete your own art"
        )
    
    try:
        relative_path = art.image_url.replace("/Arts/","")
        file_path = os.path.join(ARTS_PATH, relative_path)

        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Could not delete the image file: {e}")        
    
    db.delete(art)
    db.commit()
    return {
        "message": "Art deleted success!"
    }

##updating the art
def update_art(
    art_id: int,
    payload: dict,
    db: Session,
    art_update: ArtUpdate
)->ArtOut:
    user_id = payload.get("id")
    art = db.query(Art).filter(Art.art_id == art_id).first()

    if not art:
        raise HTTPException(status_code=404, detail="Art not found")
    
    if art.user_id!=user_id:
        raise HTTPException(status_code=404, detail="you can only update your own art")
        

    update_data = art_update.model_dump(exclude_unset=True)

    status_str = update_data.get("status", art.status)
    visibility = update_data.get("visibility", art.visibility)
    is_competing = update_data.get("is_competing", art.is_competing)

    if status_str not in ["draft", "published"]:
        raise HTTPException(status_code=400, detail="invalid")
    if visibility not in ["public", "private"]:
        raise HTTPException(status_code=400, detail="invalid")      
    if status_str == "draft" and visibility == "public":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drafted artworks can't be public"
        )
    if status_str == "published" and visibility == "private":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="published artworks can't be private"
        )
    if is_competing and (status_str=="draft" or visibility=="private"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="draft or private artworks can't be entered into any competition"
        ) 
    
    for key, value in update_data.items():
        setattr(art, key, value)

    if "is_competing" in update_data:
        if is_competing:
            active_comp = db.query(Competition).filter(Competition.is_active == True).first()
            if not active_comp:
                raise HTTPException(status_code=400, detail="no ongoing competition to join")
            
            existing_arts = (
                db.query(Art).join(competition_art_link, Art.art_id == competition_art_link.c.art_id).filter(
                    competition_art_link.c.competition_id == active_comp.competition_id,
                    Art.user_id == user_id,
                    Art.art_id != art.art_id
                ).first()
            )

            if existing_arts:
                raise HTTPException(status_code=400, detail="you already have a competing art in the current competition.")


            if art not in active_comp.participating_arts:
                active_comp.participating_arts.append(art)
        else:
            for comp in art.competitions:
                if comp.is_active and art in comp.participating_arts:
                    comp.participating_arts.remove(art)
    
    db.commit()
    db.refresh(art)

    return ArtOut.model_validate(serialize_art(art, cur_id=user_id))


    

##hearting the art
def add_heart(art_id: int, payload: dict, db:Session)->dict:
    user_id = payload["id"]

    art = db.query(Art).filter(Art.art_id == art_id).first()
    if not art:
        raise HTTPException(
            status_code=404,
            detail="Art not found"
        )
    
    check_art_access(art, user_id)
    
    heart = Heart(user_id=user_id, art_id=art_id)
    db.add(heart)

    try: 
        db.commit()
        db.refresh(heart)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Already hearted this art"
        )
    
    return{"message": "hearted!"}


##all thing I have hearted
def get_user_hearted_arts(payload: dict, db: Session)-> List[ArtThumb]:
    user_id = payload.get("id")

    heartah = (
        db.query(Art).join(Heart, Art.art_id == Heart.art_id).filter(Heart.user_id == user_id).all()
    )

    return [ArtThumb.model_validate(art) for art in heartah]


##getting everything I commented on
def get_user_critiqued_arts(payload: dict, db: Session)-> List[ArtCritism]:
    user_id = payload.get("id")

    critqqa = (
        db.query(Art).join(Critique, Art.art_id == Critique.art_id).filter(Critique.user_id == user_id).all()
    )

    results = []
    for art in critqqa:
        u_c = [c.text for c in art.critiques if c.user_id == user_id]

        results.append(ArtCritism(
            art_id= art.art_id,
            image_url = art.image_url,
            critiques = u_c
        ))

    return results

##reporting the art
def add_report(art_id: int, payload: dict, report_in , db:Session)-> ReportOut:
    user_id = payload.get("id")
    art = db.query(Art).filter(Art.art_id == art_id).first()
    if not art:
        raise HTTPException(
            status_code=404,
            detail="Art not found"
        )
    
    check_art_access(art, user_id)
    report = Report(art_id=art_id, user_id=user_id, reason=report_in.reason)
    db.add(report)
    db.commit()
    db.refresh(report)
    return ReportOut.model_validate(report)



##Listing every assets beside badge
async def list_profile_assets(db: Session):

    
    bgs  = db.query(Asset).filter(Asset.type == "background").all()
    cards  = db.query(Asset).filter(Asset.type == "card").all()

    assets = bgs + cards


    if not assets:
        return []
    
    asset_lisst = []
    for a in assets:
        asset_lisst.append({
            "id":a.id,
            "name": a.name,
            "url": a.file_path,
            "type": a.type
        })

    return asset_lisst     
 

##setting up the background / cards here
def update_bg_c(asset_id: int, asset_type: str, user_id:int, db: Session):
    if asset_type not in ["background", "card"]:
        raise HTTPException(status_code=400, detail="invalid field")
    
    asset = db.query(Asset).filter(Asset.id == asset_id, Asset.type == asset_type).first()

    if not asset:
        raise HTTPException(status_code=404, detail=f"{asset_type} not found")
    
    profile = db.query(ProfileCosmetic).filter(ProfileCosmetic.user_id ==  user_id).first()

    if not profile:
        profile = ProfileCosmetic(user_id=user_id)
        db.add(profile)

    if asset_type == "background":
        profile.selected_bg = asset.file_path
    elif asset_type == "card":
        profile.selected_card = asset.file_path

    db.commit()
    db.refresh(profile)

    return{
        "message": f"{asset_type} updated success",
        "selected_bg": profile.selected_bg,
        "selected_card": profile.selected_card
    }            


##getting my portfolio
def get_my_profile(payload: dict, db: Session):
    user_id = payload.get("id")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user not found"
        )
    
    profile_cos = db.query(ProfileCosmetic).filter(ProfileCosmetic.user_id ==  user_id).first()
    if not profile_cos:
        profile_cos = ProfileCosmetic(user_id = user_id)
        db.add(profile_cos)
        db.commit()
        db.refresh(profile_cos)


    profile_data = {
        "username": user.username,
        "full_name": user.full_name,
        "profile_picture": user.profile_pic,
        "email": user.email,
        "nationality": user.nationality,
        "biography": user.biography,
        "selected_background": profile_cos.selected_bg,
        "selected_card": profile_cos.selected_card,
        "badges": profile_cos.badges or [],
        "joined_date": user.joined_date,
        "speciality": user.speciality
    }    

    return profile_data



##getting all tags
def get_all_tags(db:Session):
    tags = db.query(Tag).all()
    return [{
        "id": tag.id,
        "name": tag.name
    } for tag in tags]

### getting arts by tags[public one]
def get_arts_by_tags(tag_names: str, db: Session, cur_id: int=None):

    tags = tag_names.split(",")
    clean_tags = []
    for t in tags:
        t = t.strip()
        if t:
            clean_tags.append(t)

    tag_list = clean_tags        

    if not tag_list:
        raise HTTPException(status_code=400, detail="No tags provided")
    
    arts = (db.query(Art).join(Art.global_tags).filter(Art.status == "published", Art.visibility == "public", Tag.name.in_(tag_list)).distinct().all())

    return [serialize_art_for_output(art, cur_id) for art in arts]



##statistics
def get_user_stats(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    
    profile  = user.profile_cosmetic
    if not profile:
        profile = ProfileCosmetic(user_id=user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)



    today = datetime.now(timezone.utc).date()
    last_active = profile.last_active_date.date() if profile.last_active_date else today

    streak_days = [last_active  - timedelta(days=i) for i in range(profile.current_streak)]
    streak_days = [d for d in streak_days if d>= today -  timedelta(days=365)]

    heatmap_data = [
        {
            "date": d.isoformat(),
            "count": 1 
        } for  d in streak_days
    ]



   

    monthly_likes_query = (
        db.query(
            func.date_format(Art.upload_date, "%Y-%m").label("month"),
            func.count(Heart.heart_id).label("likes")
         )
         .join(Heart, Heart.art_id == Art.art_id).filter(Art.user_id == user_id).group_by("month").order_by("month").all()
    )

    monthly_likes = {
        "labels": [datetime.strptime(m.month, "%Y-%m").strftime("%b %Y") for m in monthly_likes_query],
        "data": [m.likes for m in monthly_likes_query]
    }



    radar = {
        "total_arts": profile.total_arts,
        "total_wins": profile.total_wins,
        "current_streak": profile.current_streak,
        "hearts_received": sum(len(art.hearts) for art in user.arts),
        "critiques_received": sum(len(art.critiques) for art in user.arts)
    }

    return {
        "username": user.username,
        "profile_picture": user.profile_pic,
        "joined_date": user.joined_date,
        "level": profile.level,
        "progress": profile.progress,
        "recent_victories": profile.recent_victories,
        "heatmap": heatmap_data,
        "monthly_likes": monthly_likes,
        "radar": radar
    }




## getting weekly toppers
def get_weekly_top_leaders(db: Session, limit: int=10):
    active_comp = db.query(Competition).filter(Competition.is_active == True).first()
    if not active_comp:
        return [] ## ongling competion only nor past compeitions arts.
    
    art_id_rows = db.query(competition_art_link.c.art_id).filter(
        competition_art_link.c.competition_id == active_comp.competition_id
    ).all()
    art_ids = [row[0] for row in art_id_rows]

    if not art_ids:
        return []
    
    arts = db.query(Art).filter(Art.art_id.in_(art_ids)).all()
    leaderboard = []


    for art in arts:
        user  = art.artist
        hearts_count = len(art.hearts)
        critiques_count = len(art.critiques)
        engagement_points = hearts_count + critiques_count

        leaderboard.append({
            "username": user.username,
            "profile_picture": user.profile_pic,
            "competing_art":{
                "art_id": art.art_id,
                "image_name": art.image_name,
                "upload_date": art.upload_date
            },
            "engagement_points": engagement_points
        })

    leaderboard.sort(key=lambda x:x["engagement_points"], reverse=True)

    return leaderboard[:limit]
    


##getting leaderboard top
def gt_leaderboard_top(db: Session, limit: int=10) -> List[dict]:
    leaders = (
        db.query(TopLeader).join(User, TopLeader.user_id == User.id).order_by(TopLeader.weekly_wins.desc(), TopLeader.engagement_points.desc()).limit(limit).all()
    )

    leaderboard = []
    for leader in leaders:
        user = leader.user
        leaderboard.append({
            "user_id": user.id,
            "username": user.username,
            "profile_picture": user.profile_pic,
            "weekly_wins": leader.weekly_wins,
            "engagement_points": leader.engagement_points,
            "joined_at": user.joined_date
        })    

    return leaderboard    



##gallery
#creating
def create_gallery(user_id: int, tag_name: str, db: Session):
    existing = db.query(ArtistTag).filter(
        ArtistTag.user_id == user_id, ArtistTag.name == tag_name
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Galery alreay exists")
    
    new_gallery = ArtistTag(user_id=user_id, name=tag_name)
    db.add(new_gallery)
    db.commit()
    db.refresh(new_gallery)
    return{"id": new_gallery.id, "name": new_gallery.name}


##lising gallery
def list_galleries(user_id: int, db:Session):
    galleries = db.query(ArtistTag).filter(ArtistTag.user_id == user_id).all()
    return [{
        "id": g.id,
        "name": g.name,
        "arts_count": len(g.arts)
    } for g in galleries]

##assigning
def add_art_to_gallery(user_id:int, art_id: int, gallery_id: int, db:Session):
    art = db.query(Art).filter(Art.art_id == art_id, Art.user_id ==user_id).first()
    if not art:
        raise HTTPException(status_code=404, detail="Art not found or not yours")
    

    gallery = db.query(ArtistTag).filter(
        ArtistTag.id == gallery_id, ArtistTag.user_id == user_id
    ).first()

    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")

    if gallery.id  in [g.id for g in art.artist_tags]:
        raise HTTPException(status_code=400, detail="Art already in this gallery")
    
    if art.artist_tags:
        existing = art.artist_tags[0].name
        raise HTTPException(status_code=400, detail=f"Art already in this gallery {existing}")
        

    art.artist_tags.append(gallery)
    db.commit()
    return {"message": f"Art {art.art_id} added to gallery '{gallery.name}'"}



#lising all arts in a gallery
def list_arts_in_gallery(user_id: int, gallery_id: int, db: Session):
    gallery = db.query(ArtistTag).filter(ArtistTag.id == gallery_id, ArtistTag.user_id == user_id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="gallery not found")

    return{
        "id": gallery.id,
        "name": gallery.name,
        "arts": [serialize_art_for_output(art, user_id) for art in gallery.arts]
    }    



##deleting gallery
def delete_gallery(user_id: int, gallery_id: int, db: Session):
    gallery = db.query(ArtistTag).filter(
        ArtistTag.id == gallery_id,
        ArtistTag.user_id == user_id
    ).first()

    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")
    
    for art in gallery.arts:
        art.artist_tags.remove(gallery)
    
    db.delete(gallery)
    db.commit()

    return{
            "message": f"gallery {gallery.name} deleted"
    }
    



##deleing art from gallery
def delete_art_fromgallery(user_id: int, art_id: int, gallery_id: int, db: Session):
    art = db.query(Art).filter(
        Art.art_id == art_id,
        Art.user_id == user_id
    ).first()

    if not art:
        raise HTTPException(status_code=404, detail="Art not found")
    

    gallery = db.query(ArtistTag).filter(
        ArtistTag.id == gallery_id,
        ArtistTag.user_id == user_id
    ).first()

    if not gallery:
        raise HTTPException(status_code=404, detail="Art not found")
    

    if gallery not in art.artist_tags:
        raise HTTPException(status_code=400, detail="Art is not realted to this gallery")
    
    art.artist_tags.remove(gallery)
    db.commit()

    return{
            "message": f"{art.image_name} removed from {gallery.name} deleted"
    }   