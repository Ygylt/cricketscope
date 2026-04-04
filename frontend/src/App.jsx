import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import HeadToHead from "./pages/HeadToHead";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/players" element={<Players />} />
            <Route path="/head-to-head" element={<HeadToHead />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;