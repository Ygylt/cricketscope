import pandas as pd
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from load_data import load_matches
from clean_data import clean_matches

def analyze(df):
    results = {}

    # --- Team win rates ---
    team_stats = []
    all_teams = pd.concat([df["team1"], df["team2"]]).unique()

    for team in all_teams:
        played = df[(df["team1"] == team) | (df["team2"] == team)]
        wins = df[df["winner"] == team]
        total = len(played)
        win_count = len(wins)
        win_rate = round((win_count / total) * 100, 2) if total > 0 else 0
        team_stats.append({
            "team": team,
            "played": total,
            "wins": win_count,
            "win_rate": win_rate
        })

    results["team_win_rates"] = (
        pd.DataFrame(team_stats)
        .sort_values("win_rate", ascending=False)
        .reset_index(drop=True)
    )

    # --- Top players of the match ---
    results["top_players"] = (
        df["player_of_match"]
        .dropna()
        .value_counts()
        .reset_index()
        .rename(columns={"index": "player", "player_of_match": "awards"})
        .head(20)
    )

    # --- Most matches played by a team ---
    results["most_active_teams"] = (
        results["team_win_rates"]
        .sort_values("played", ascending=False)
        .head(10)
    )

    def head_to_head(team1, team2):
        h2h = df[
            ((df["team1"] == team1) & (df["team2"] == team2)) |
            ((df["team1"] == team2) & (df["team2"] == team1))
        ].copy()

        total = len(h2h)
        team1_wins = len(h2h[h2h["winner"] == team1])
        team2_wins = len(h2h[h2h["winner"] == team2])

        return {
            "team1": team1,
            "team2": team2,
            "total_matches": total,
            f"{team1}_wins": team1_wins,
            f"{team2}_wins": team2_wins,
            "recent_matches": h2h[["date", "team1", "team2", "winner", "margin"]].head(5)
        }

    results["head_to_head"] = head_to_head

    return results

if __name__ == "__main__":
    raw_df = load_matches()
    clean_df = clean_matches(raw_df)
    results = analyze(clean_df)

    print("\n TOP 10 TEAMS BY WIN RATE (min context: all matches)")
    print(results["team_win_rates"].head(10).to_string(index=False))

    print("\n TOP 20 PLAYERS OF THE MATCH")
    print(results["top_players"].to_string(index=False))

    print("\n TOP 10 MOST ACTIVE TEAMS")
    print(results["most_active_teams"].to_string(index=False))

    print("\n  HEAD-TO-HEAD: India vs Pakistan")
    h2h = results["head_to_head"]("India", "Pakistan")
    print(f"Total matches: {h2h['total_matches']}")
    print(f"India wins: {h2h['India_wins']}")
    print(f"Pakistan wins: {h2h['Pakistan_wins']}")
    print("\nMost recent matches:")
    print(h2h["recent_matches"].to_string(index=False))