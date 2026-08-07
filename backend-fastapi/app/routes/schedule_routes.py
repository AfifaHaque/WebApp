from fastapi import APIRouter, Depends

from app.controllers.schedule_controller import (
    create_new_schedule,
    delete_existing_schedule,
    get_all_schedules,
)
from app.dependencies.auth import get_current_user
from app.models.schedule import ScheduleCreate


router = APIRouter(
    prefix="/api/schedules",
    tags=["Study Schedule"],
)


@router.get("")
def get_schedules(
    current_user: dict = Depends(get_current_user),
):
    return get_all_schedules(
        current_user["id"]
    )


@router.post("")
def create_schedule(
    schedule: ScheduleCreate,
    current_user: dict = Depends(get_current_user),
):
    return create_new_schedule(
        schedule.model_dump(),
        current_user["id"],
    )


@router.delete("/{schedule_id}")
def delete_schedule(
    schedule_id: str,
    current_user: dict = Depends(get_current_user),
):
    return delete_existing_schedule(
        schedule_id,
        current_user["id"],
    )