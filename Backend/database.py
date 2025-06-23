from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()


DB_URL = os.getenv("CONNECTION_STRING")

engine = create_engine(DB_URL, pool_pre_ping= True)
localsession = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = localsession()
    try:
        yield db
    finally:
        db.close()
     