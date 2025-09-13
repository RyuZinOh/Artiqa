import os
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from models import Art
from schemas import ArtOut
from dotenv import load_dotenv

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