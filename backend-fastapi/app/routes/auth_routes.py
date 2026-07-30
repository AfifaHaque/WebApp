from fastapi import APIRouter

from app.controllers.auth_controller import (
    login_user,
    register_user,
)
from app.models.user import UserLogin, UserRegister

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(user: UserRegister):
    return register_user(user.model_dump())


@router.post("/login")
def login(user: UserLogin):
    return login_user(user.model_dump())