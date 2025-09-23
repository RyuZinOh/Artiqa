from  fastapi import FastAPI
from database import engine
from models import Base
from contextlib import asynccontextmanager
from routes import user as user_routes
from routes import admin as admin_routes
from routes import artist as artist_routes
from routes import ws_notific as notification_routes
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)

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
app.include_router(notification_routes.router)


@app.get("/")
async def root():
    return {
        "message": "Artiqa is backshotting! SMH"
    }