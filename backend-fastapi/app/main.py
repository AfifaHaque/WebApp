from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import check_database_connection
from app.routes.task_routes import router as task_router
from app.routes.auth_routes import router as auth_router


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
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(task_router)


@app.get("/")
def root():
    return {"message": "Student Study Planner API is running"}


@app.get("/api/database-status")
def database_status():
    return check_database_connection()