from fastapi import APIRouter, Depends

from app.controllers.task_controller import (
    complete_existing_task,
    create_new_task,
    delete_existing_task,
    get_all_tasks,
)
from app.dependencies.auth import get_current_user
from app.models.task import TaskCreate

router = APIRouter(
    prefix="/api/tasks",
    tags=["Tasks"],
)


@router.get("")
def get_tasks(
    current_user: dict = Depends(get_current_user),
):
    return get_all_tasks(current_user["id"])


@router.post("")
def create_task(
    task: TaskCreate,
    current_user: dict = Depends(get_current_user),
):
    return create_new_task(
        task.model_dump(),
        current_user["id"],
    )


@router.patch("/{task_id}/complete")
def complete_task(
    task_id: str,
    current_user: dict = Depends(get_current_user),
):
    return complete_existing_task(
        task_id,
        current_user["id"],
    )


@router.delete("/{task_id}")
def delete_task(
    task_id: str,
    current_user: dict = Depends(get_current_user),
):
    return delete_existing_task(
        task_id,
        current_user["id"],
    )