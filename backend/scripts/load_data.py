import json
import os
import pandas as pd

RAW_DATA_PATH = "data/raw"

def load_matches():
    matches = []

    for filename in os.listdir(RAW_DATA_PATH):
        if not filename.endswith(".json"):
            continue

        with open(os.path.join(RAW_DATA_PATH, filename)) as f:
            raw = json.load(f)

        info = raw.get("info", {})
        outcome = info.get("outcome", {})
        by = outcome.get("by", {})

        match = {
            "match_id": filename.replace(".json", ""),
            "date": info.get("dates", [None])[0],
            "event": info.get("event", {}).get("name"),
            "teams": info.get("teams", []),
            "winner": outcome.get("winner"),
            "win_by_wickets": by.get("wickets"),
            "win_by_runs": by.get("runs"),
            "player_of_match": info.get("player_of_match", [None])[0],
            "venue": info.get("venue"),
            "gender": info.get("gender"),
        }
        matches.append(match)

    df = pd.DataFrame(matches)
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date", ascending=False)
    return df

if __name__ == "__main__":
    df = load_matches()
    print(f"✅ Loaded {len(df)} matches")
    print(df.head(10))