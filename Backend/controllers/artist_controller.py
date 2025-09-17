import os
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from models import Art, Critique, Heart, Report, ProfileCosmetic, Asset, User
from schemas import ArtOut, CritiqueOut, ReportOut, ArtThumb, ArtCritism, ArtUpdate
from dotenv import load_dotenv
from typing import List
from sqlalchemy.exc import IntegrityError
from utils.update_streak import update_user_streak

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
    }


async def upload_art(payload: dict, file: UploadFile, description: str, status_str: str, visibility: str, is_competing:bool, db: Session, image_name: str) -> ArtOut:
    if payload.get("role_id") !=699:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="only aritists!"
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
    db.add(new_art)
    db.commit()
    db.refresh(new_art)


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
        "hearted_by_user": any(h.user_id == cur_id for h in art.hearts) if cur_id  else False
        
    }





def get_all_arts(db: Session)->List[ArtOut]:
    arts = db.query(Art).all()
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
        raise HTTPException(status_code=404, detail="Art Not Found")
    if art.user_id != user_id:
        raise HTTPException(status_code=403, detail="You can only update your own art.")
    
    update_data = art_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(art, key, value)
    
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
        "joined_date": user.joined_date
    }    

    return profile_data