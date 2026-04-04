from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_URI)
db = client["cricketscope"]

# Collections
matches_collection = db["matches"]
teams_collection = db["teams"]
players_collection = db["players"]