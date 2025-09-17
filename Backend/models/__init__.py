from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
##regestering models
from .user_model import User
from .role_model import Role
from .password_model import Password
from .role_request_model import RoleRequest
from .arts_model import Art
from .critiques_model import Critique
from .hearts_model import Heart
from .reports_model import Report
from .profilecosmetic_model import ProfileCosmetic
from .tags_model import Tag
from .artisttags_model import ArtistTag
from .asset_model import Asset
