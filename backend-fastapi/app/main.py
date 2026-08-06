from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import check_database_connection
from app.routes.auth_routes import router as auth_router
from app.routes.task_routes import router as task_router


app = FastAPI(
    title="Student Study Planner API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(task_router)


@app.get("/")
def home():
    return {
        "message": "Student Study Planner FastAPI Backend is Running!"
    }


@app.get("/api/database-status")
def database_status():
    return check_database_connection()