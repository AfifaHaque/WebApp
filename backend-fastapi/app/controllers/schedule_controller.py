from datetime import datetime, timezone

from bson import ObjectId
from fastapi import HTTPException

from app.database import schedules_collection


def serialize_schedule(schedule: dict) -> dict:
    return {
        "_id": str(schedule["_id"]),
        "id": str(schedule["_id"]),
        "course": schedule.get("course", ""),
        "date": schedule.get("date", ""),
        "startTime": schedule.get("startTime", ""),
        "endTime": schedule.get("endTime", ""),
        "topic": schedule.get("topic", ""),
        "notes": schedule.get("notes", ""),
        "userId": schedule.get("userId"),
        "createdAt": schedule.get("createdAt"),
    }


def get_all_schedules(user_id: str):
    schedules = schedules_collection.find(
        {"userId": user_id}
    ).sort("createdAt", -1)

    return [
        serialize_schedule(schedule)
        for schedule in schedules
    ]


def create_new_schedule(
    schedule_data: dict,
    user_id: str,
):
    schedule_data["userId"] = user_id
    schedule_data["createdAt"] = datetime.now(
        timezone.utc
    )

    result = schedules_collection.insert_one(
        schedule_data
    )

    created_schedule = schedules_collection.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_schedule(created_schedule)


def delete_existing_schedule(
    schedule_id: str,
    user_id: str,
):
    if not ObjectId.is_valid(schedule_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid schedule ID",
        )

    result = schedules_collection.delete_one(
        {
            "_id": ObjectId(schedule_id),
            "userId": user_id,
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Schedule not found",
        )

    return {
        "message": "Schedule deleted successfully"
    }