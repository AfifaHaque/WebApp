from datetime import datetime, timezone

from bson import ObjectId
from fastapi import HTTPException

from app.database import materials_collection


def serialize_material(material: dict) -> dict:
    return {
        "_id": str(material["_id"]),
        "id": str(material["_id"]),
        "title": material.get("title", ""),
        "course": material.get("course", ""),
        "url": material.get("url", ""),
        "description": material.get("description", ""),
        "userId": material.get("userId"),
        "createdAt": material.get("createdAt"),
    }


def get_all_materials(user_id: str):
    materials = materials_collection.find(
        {"userId": user_id}
    ).sort("createdAt", -1)

    return [
        serialize_material(material)
        for material in materials
    ]


def create_new_material(
    material_data: dict,
    user_id: str,
):
    material_data["userId"] = user_id
    material_data["createdAt"] = datetime.now(
        timezone.utc
    )

    result = materials_collection.insert_one(
        material_data
    )

    created_material = materials_collection.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_material(created_material)


def delete_existing_material(
    material_id: str,
    user_id: str,
):
    if not ObjectId.is_valid(material_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid material ID",
        )

    result = materials_collection.delete_one(
        {
            "_id": ObjectId(material_id),
            "userId": user_id,
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Material not found",
        )

    return {
        "message": "Material deleted successfully"
    }