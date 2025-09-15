import os
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from models import Art, Critique, Heart, Report
from schemas import ArtOut, CritiqueOut, ReportOut
from dotenv import load_dotenv
from typing import List
from sqlalchemy.exc import IntegrityError

load_dotenv()
ARTS_PATH = os.getenv("ARTS_PATH")

async def upload_art(payload: dict, file: UploadFile, description: str, status_str: str, visibility: str, is_competing:bool, db: Session) -> ArtOut:
    if payload.get("role_id") !=699:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="only aritists!"
        )  
    
    username = payload.get("sub")
    user_fold = os.path.join(ARTS_PATH, username, "creations")
    os.makedirs(user_fold, exist_ok=True)

    ufp = os.path.join(user_fold, file.filename)

    contents = await file.read()
    for p in [ufp]:
        with open(p, "wb") as f:
            f.write(contents)
    await file.close()

    relative_path = f"/Arts/{username}/creations/{file.filename}"

    new_art = Art(
        user_id = payload.get("id"),
        image_name = file.filename,
        image_url = relative_path,
        description = description,
        status = status_str,
        visibility = visibility,
        is_competing = is_competing,
    )
    db.add(new_art)
    db.commit()
    db.refresh(new_art)
    
    return  ArtOut.model_validate(new_art)






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


##unhearting [yet to add]



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

