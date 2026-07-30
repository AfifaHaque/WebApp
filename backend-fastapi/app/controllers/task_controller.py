from datetime import datetime, timezone

from bson import ObjectId
from fastapi import HTTPException

from app.database import tasks_collection


def serialize_task(task: dict) -> dict:
    return {
        "id": str(task["_id"]),
        "_id": str(task["_id"]),
        "title": task.get("title", ""),
        "description": task.get("description", ""),
        "dueDate": task.get("dueDate"),
        "priority": task.get("priority", "medium"),
        "status": task.get("status", "pending"),
        "tags": task.get("tags", []),
        "userId": task.get("userId"),
        "createdAt": task.get("createdAt"),
    }


def get_all_tasks(user_id: str):
    tasks = tasks_collection.find(
        {"userId": user_id}
    ).sort("createdAt", -1)

    return [serialize_task(task) for task in tasks]


def create_new_task(task_data: dict, user_id: str):
    task_data["userId"] = user_id
    task_data["createdAt"] = datetime.now(timezone.utc)

    result = tasks_collection.insert_one(task_data)

    created_task = tasks_collection.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_task(created_task)


def complete_existing_task(task_id: str, user_id: str):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid task ID",
        )

    result = tasks_collection.update_one(
        {
            "_id": ObjectId(task_id),
            "userId": user_id,
        },
        {
            "$set": {
                "status": "completed"
            }
        },
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    updated_task = tasks_collection.find_one(
        {
            "_id": ObjectId(task_id),
            "userId": user_id,
        }
    )

    return serialize_task(updated_task)


def delete_existing_task(task_id: str, user_id: str):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid task ID",
        )

    result = tasks_collection.delete_one(
        {
            "_id": ObjectId(task_id),
            "userId": user_id,
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return {
        "message": "Task deleted successfully"
    }