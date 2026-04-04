from fastapi import APIRouter, HTTPException
from pathlib import Path
import json

router = APIRouter()

DATA_PATH = Path("backend/data")

def load_json(filename):
    filepath = DATA_PATH / filename
    if not filepath.exists():
        raise HTTPException(status_code=404, detail=f"{filename} not found. Run export_data.py first.")
    with open(filepath) as f:
        return json.load(f)

@router.get("/health")
async def health_check():
    return {"status": "ok", "message": "CricketScope API is running"}

@router.get("/teams")
async def get_teams():
    data = load_json("team_win_rates.json")
    return {"teams": data}

@router.get("/teams/{team_name}")
async def get_team(team_name: str):
    data = load_json("team_win_rates.json")
    team = next((t for t in data if t["team"].lower() == team_name.lower()), None)
    if not team:
        raise HTTPException(status_code=404, detail=f"Team '{team_name}' not found")
    return team

@router.get("/players")
async def get_top_players():
    data = load_json("top_players.json")
    return {"players": data}

@router.get("/matches/recent")
async def get_recent_matches():
    data = load_json("recent_matches.json")
    return {"matches": data}

@router.get("/matches/active-teams")
async def get_active_teams():
    data = load_json("most_active_teams.json")
    return {"teams": data}

@router.get("/head-to-head")
async def get_head_to_head(team1: str, team2: str):
    data = load_json("head_to_head.json")
    result = next(
        (h for h in data if
         (h["team1"].lower() == team1.lower() and h["team2"].lower() == team2.lower()) or
         (h["team1"].lower() == team2.lower() and h["team2"].lower() == team1.lower())),
        None
    )
    if not result:
        raise HTTPException(status_code=404, detail=f"No head-to-head data for {team1} vs {team2}")
    return result