from  fastapi import FastAPI
from database import engine
from models import Base
from contextlib import asynccontextmanager
from routes import user as user_routes
from routes import admin as admin_routes
from routes import artist as artist_routes
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)



ARTS_PATH = os.getenv("ARTS_PATH")
os.makedirs(ARTS_PATH, exist_ok=True)



app.mount("/Arts", StaticFiles(directory=ARTS_PATH), name="arts")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials =True,
    allow_methods =["*"],
    allow_headers =["*"]


)
app.include_router(user_routes.router)
app.include_router(admin_routes.router)
app.include_router(artist_routes.router)



@app.get("/")
async def root():
    return {
        "message": "Artiqa is backshotting! SMH"
    }