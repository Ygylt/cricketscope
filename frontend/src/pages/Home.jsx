import { useEffect, useState } from "react";
import { getRecentMatches, getActiveTeams } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Home() {
  const [matches, setMatches] = useState([]);
  const [activeTeams, setActiveTeams] = useState([]);

  useEffect(() => {
    getRecentMatches().then(r => setMatches(r.data.matches));
    getActiveTeams().then(r => setActiveTeams(r.data.teams));
  }, []);

  return (
    <div style={styles.page}>
      <h1>🏏 CricketScope Dashboard</h1>

      <section style={styles.section}>
        <h2>Most Active Teams</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activeTeams}>
            <XAxis dataKey="team" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="played" fill="#4299e1" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section style={styles.section}>
        <h2>Recent Matches</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th><th>Team 1</th><th>Team 2</th><th>Winner</th><th>Margin</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m, i) => (
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
    </div>
  );
}

const styles = {
  page: { padding: "2rem", background: "#0f0f23", minHeight: "100vh", color: "white" },
  section: { marginBottom: "2rem", background: "#1a1a2e", padding: "1.5rem", borderRadius: "8px" },
  table: { width: "100%", borderCollapse: "collapse" }
};

export default Home;