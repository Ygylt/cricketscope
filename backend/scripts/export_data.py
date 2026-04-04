import json
import sys
import os
import pandas as pd

sys.path.insert(0, os.path.dirname(__file__))
from load_data import load_matches
from clean_data import clean_matches
from analyze_data import analyze

OUTPUT_PATH = "backend/data"

def export():
    print("Loading and cleaning data...")
    raw_df = load_matches()
    clean_df = clean_matches(raw_df)
    results = analyze(clean_df)

    results["team_win_rates"].to_json(
        f"{OUTPUT_PATH}/team_win_rates.json", orient="records", indent=2
    )
    print("Exported team_win_rates.json")

    results["top_players"].to_json(
        f"{OUTPUT_PATH}/top_players.json", orient="records", indent=2
    )
    print("Exported top_players.json")

    results["most_active_teams"].to_json(
        f"{OUTPUT_PATH}/most_active_teams.json", orient="records", indent=2
    )
    print("Exported most_active_teams.json")

    clean_df.head(50).to_json(
        f"{OUTPUT_PATH}/recent_matches.json", orient="records", indent=2,
        default_handler=str
    )
    print("Exported recent_matches.json")

    # Head to head for top rivalries
    rivalries = [
        ("India", "Pakistan"),
        ("India", "Australia"),
        ("Australia", "England"),
        ("India", "England"),
        ("Pakistan", "Australia"),
    ]
    h2h_all = []
    for t1, t2 in rivalries:
        h2h = results["head_to_head"](t1, t2)
        h2h_all.append({
            "team1": h2h["team1"],
            "team2": h2h["team2"],
            "total_matches": h2h["total_matches"],
            f"{t1}_wins": h2h[f"{t1}_wins"],
            f"{t2}_wins": h2h[f"{t2}_wins"],
            "recent_matches": h2h["recent_matches"].to_dict(orient="records")
        })

    with open(f"{OUTPUT_PATH}/head_to_head.json", "w") as f:
        json.dump(h2h_all, f, indent=2, default=str)
    print(" Exported head_to_head.json")

    print("\n All data exported successfully!")

if __name__ == "__main__":
    export()