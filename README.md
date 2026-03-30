# 🏏 CricketScope

A live cricket analytics dashboard built with Python and React.

## Tech Stack
- **Data Pipeline** — Python, pandas, Cricsheet dataset
- **Backend** — FastAPI, MongoDB
- **Frontend** — React, Recharts

## Project Structure
```
cricketscope/
├── backend/
│   ├── scripts/      # Data pipeline scripts
│   └── api/          # FastAPI app (coming Week 2)
├── frontend/         # React dashboard (coming Week 3)
└── data/             # Raw match data
```

## Pipeline Scripts
- `load_data.py` — Loads 5100 T20 matches from Cricsheet
- `clean_data.py` — Cleans and structures to 4950 matches
- `analyze_data.py` — Team win rates, top players, head-to-head stats