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
ALL_PATH = os.getenv("ALL_PATH")

async def upload_art(payload: dict, file: UploadFile, description: str, status_str: str, visibility: str, is_competing:bool, db: Session) -> ArtOut:
    if payload.get("role_id") !=699:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="only aritists!"
        )  
    
    username = payload.get("sub")
    user_fold = os.path.join(ARTS_PATH, username, "creations")
    os.makedirs(user_fold, exist_ok=True)
    os.makedirs(ALL_PATH, exist_ok=True)

    ufp = os.path.join(user_fold, file.filename)
    afp = os.path.join(ALL_PATH, file.filename)

    contents = await file.read()
    for p in [ufp, afp]:
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






def serialize_art(art: Art)-> dict:
    return{
        **art.__dict__, # this one is used to unpack the dictionary else we have to explicity define everything xd
        "critiques": art.critiques,
        "reports": art.reports,
        "critiques_count":len(art.critiques),
        "hearts_count": len(art.hearts)
    }

def get_all_arts(db: Session)->List[ArtOut]:
    arts = db.query(Art).all()
    results = []
    for art in arts:
        results.append(ArtOut.model_validate(serialize_art(art)))
    return results    

def get_arts_by_id(art_id: int, db: Session)->ArtOut:
    art = db.query(Art).filter(Art.art_id == art_id).first()
    if not art:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"art with id {art_id} not found!"
        )
    
    return ArtOut.model_validate(serialize_art(art))


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
    return CritiqueOut.model_validate(critique)



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

