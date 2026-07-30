from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException

from app.database import check_database_connection
from app.routes.task_routes import router as task_router
from app.routes.auth_routes import router as auth_router

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://web-app-omega-opal.vercel.app",
        "https://web-app-git-main-webapp18.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router)
app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Student Study Planner FastAPI Backend is Running!"
    }


@app.get("/api/database-status")
def database_status():
    if not check_database_connection():
        raise HTTPException(
            status_code=500,
            detail="Could not connect to MongoDB",
        )

    return {
        "status": "connected",
        "database": "student_study_planner",
    }