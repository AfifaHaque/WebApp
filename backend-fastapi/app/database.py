import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGO_URI:
    raise ValueError("MONGO_URI is missing from the .env file")

if not DATABASE_NAME:
    raise ValueError("DATABASE_NAME is missing from the .env file")

client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
database = client[DATABASE_NAME]

users_collection = database["users"]
tasks_collection = database["tasks"]


def check_database_connection() -> bool:
    try:
        client.admin.command("ping")
        return True
    except PyMongoError:
        return False