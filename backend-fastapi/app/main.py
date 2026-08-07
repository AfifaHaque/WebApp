from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.database import check_database_connection
from app.routes.auth_routes import router as auth_router
from app.routes.task_routes import router as task_router
from app.routes.schedule_routes import router as schedule_router
from app.routes.material_routes import router as material_router

app = FastAPI(
    title="Student Study Planner API",
    description="FastAPI backend for Student Study Planner",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(task_router)
app.include_router(schedule_router)
app.include_router(material_router)


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