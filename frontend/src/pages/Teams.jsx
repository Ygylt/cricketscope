import { useEffect, useState } from "react";
import { getTeams } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then(r => setTeams(r.data.teams));
  }, []);

  const top20 = teams.slice(0, 20);

  return (
    <div style={styles.page}>
      <h1>🏆 Team Win Rates</h1>
      <section style={styles.section}>
        <h2>Top 20 Teams by Win Rate</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={top20}>
            <XAxis dataKey="team" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="win_rate" fill="#f6ad55" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section style={styles.section}>
        <h2>All Teams</h2>
        <table style={styles.table}>
          <thead>
            <tr><th>Team</th><th>Played</th><th>Wins</th><th>Win Rate %</th></tr>
          </thead>
          <tbody>
            {teams.map((t, i) => (
              <tr key={i}>
                <td>{t.team}</td>
                <td>{t.played}</td>
                <td>{t.wins}</td>
                <td style={{ color: "#f6ad55" }}>{t.win_rate}%</td>
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

export default Teams;