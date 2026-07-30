import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import HTTPException

from app.database import users_collection

JWT_SECRET = os.getenv("JWT_SECRET", "studyplannersecret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")
)


def register_user(user_data: dict):
    existing_user = users_collection.find_one(
        {"email": user_data["email"]}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email is already registered",
        )

    hashed_password = bcrypt.hashpw(
        user_data["password"].encode("utf-8"),
        bcrypt.gensalt(),
    )

    user_document = {
        "name": user_data["name"],
        "email": user_data["email"],
        "password": hashed_password.decode("utf-8"),
        "role": user_data.get("role", "student"),
    }

    result = users_collection.insert_one(user_document)

    return {
        "message": "User registered successfully",
        "user": {
            "id": str(result.inserted_id),
            "name": user_document["name"],
            "email": user_document["email"],
            "role": user_document["role"],
        },
    }


def login_user(login_data: dict):
    user = users_collection.find_one(
        {"email": login_data["email"]}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    password_is_valid = bcrypt.checkpw(
        login_data["password"].encode("utf-8"),
        user["password"].encode("utf-8"),
    )

    if not password_is_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    expiry = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    token_payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "role": user.get("role", "student"),
        "exp": expiry,
    }

    token = jwt.encode(
        token_payload,
        JWT_SECRET,
        algorithm=ALGORITHM,
    )

    return {
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user.get("role", "student"),
        },
    }