from  fastapi import FastAPI
from database import engine
from models import Base
from contextlib import asynccontextmanager
from routes import user as user_routes
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(user_routes.router)