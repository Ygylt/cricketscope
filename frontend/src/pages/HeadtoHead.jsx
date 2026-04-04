import { useState } from "react";
import { getHeadToHead } from "../api";

function HeadToHead() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const search = async () => {
    setError("");
    setResult(null);
    try {
      const r = await getHeadToHead(team1, team2);
      setResult(r.data);
    } catch {
      setError("No data found for this matchup. Try a different pair.");
    }
  };

  return (
    <div style={styles.page}>
      <h1>⚔️ Head to Head</h1>

      <section style={styles.section}>
        <div style={styles.inputs}>
          <input
            style={styles.input}
            placeholder="Team 1 (e.g. India)"
            value={team1}
            onChange={e => setTeam1(e.target.value)}
          />
          <span style={{ color: "white", fontSize: "1.5rem" }}>vs</span>
          <input
            style={styles.input}
            placeholder="Team 2 (e.g. Pakistan)"
            value={team2}
            onChange={e => setTeam2(e.target.value)}
          />
          <button style={styles.button} onClick={search}>Search</button>
        </div>
        {error && <p style={{ color: "#fc8181" }}>{error}</p>}
      </section>

      {result && (
        <section style={styles.section}>
          <h2>{result.team1} vs {result.team2}</h2>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <p style={styles.statNum}>{result.total_matches}</p>
              <p>Total Matches</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statNum}>{result[`${result.team1}_wins`]}</p>
              <p>{result.team1} Wins</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statNum}>{result[`${result.team2}_wins`]}</p>
              <p>{result.team2} Wins</p>
            </div>
          </div>

          <h3>Recent Matches</h3>
          <table style={styles.table}>
            <thead>
              <tr><th>Date</th><th>Team 1</th><th>Team 2</th><th>Winner</th><th>Margin</th></tr>
            </thead>
            <tbody>
              {result.recent_matches.map((m, i) => (
                <tr key={i}>
                  <td>{m.date?.split("T")[0]}</td>
                  <td>{m.team1}</td>
                  <td>{m.team2}</td>
                  <td style={{ color: "#68d391", fontWeight: "bold" }}>{m.winner}</td>
                  <td>{m.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "2rem", background: "#0f0f23", minHeight: "100vh", color: "white" },
  section: { marginBottom: "2rem", background: "#1a1a2e", padding: "1.5rem", borderRadius: "8px" },
  inputs: { display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" },
  input: { padding: "0.6rem 1rem", borderRadius: "6px", border: "none", fontSize: "1rem", width: "200px" },
  button: { padding: "0.6rem 1.5rem", background: "#4299e1", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "1rem" },
  stats: { display: "flex", gap: "2rem", marginBottom: "1.5rem" },
  stat: { textAlign: "center", background: "#2d3748", padding: "1rem 2rem", borderRadius: "8px" },
  statNum: { fontSize: "2rem", fontWeight: "bold", color: "#68d391", margin: 0 },
  table: { width: "100%", borderCollapse: "collapse" }
};

export default HeadToHead;