from fastapi import APIRouter, Depends

from app.controllers.material_controller import (
    create_new_material,
    delete_existing_material,
    get_all_materials,
)
from app.dependencies.auth import get_current_user
from app.models.material import MaterialCreate


router = APIRouter(
    prefix="/api/materials",
    tags=["Study Materials"],
)


@router.get("")
def get_materials(
    current_user: dict = Depends(get_current_user),
):
    return get_all_materials(
        current_user["id"]
    )


@router.post("")
def create_material(
    material: MaterialCreate,
    current_user: dict = Depends(get_current_user),
):
    return create_new_material(
        material.model_dump(),
        current_user["id"],
    )


@router.delete("/{material_id}")
def delete_material(
    material_id: str,
    current_user: dict = Depends(get_current_user),
):
    return delete_existing_material(
        material_id,
        current_user["id"],
    )