import { useEffect, useState } from "react";
import { getTopPlayers } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getTopPlayers().then(r => setPlayers(r.data.players));
  }, []);

  return (
    <div style={styles.page}>
      <h1>🌟 Top Players of the Match</h1>

      <section style={styles.section}>
        <h2>Top 20 Players</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={players} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="awards" type="category" tick={{ fontSize: 11 }} width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#9f7aea" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", background: "#0f0f23", minHeight: "100vh", color: "white" },
  section: { background: "#1a1a2e", padding: "1.5rem", borderRadius: "8px" }
};

export default Players;