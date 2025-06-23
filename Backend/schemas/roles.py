from enum import Enum
class RoleFixed(str, Enum):
    superuser = "superuser"
    artist = "artist"
    user = "user"