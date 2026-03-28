import pandas as pd
from load_data import load_matches

def clean_matches(df):
    # Drop rows with no date or winner
    df = df.dropna(subset=["date", "winner"])

    # Extract both team names into separate columns
    df["team1"] = df["teams"].apply(lambda x: x[0] if len(x) > 0 else None)
    df["team2"] = df["teams"].apply(lambda x: x[1] if len(x) > 1 else None)

    # Drop the raw teams list column
    df = df.drop(columns=["teams"])

    # Add a margin column — readable win description
    df["margin"] = df.apply(
        lambda row: f"{int(row['win_by_runs'])} runs" if pd.notna(row["win_by_runs"])
        else (f"{int(row['win_by_wickets'])} wickets" if pd.notna(row["win_by_wickets"])
        else "unknown"),
        axis=1
    )

    # Clean up dtypes
    df["match_id"] = df["match_id"].astype(str)
    df = df.reset_index(drop=True)

    return df

if __name__ == "__main__":
    raw_df = load_matches()
    clean_df = clean_matches(raw_df)
    print(f"✅ Clean dataset: {len(clean_df)} matches")
    print(clean_df[["date", "team1", "team2", "winner", "margin", "player_of_match"]].head(10))