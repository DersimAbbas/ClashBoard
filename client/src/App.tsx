import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import Matches from "./pages/Matches";
import LeagueDetail from "./pages/LeagueDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/players/:id" element={<PlayerProfile />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/leagues/:id" element={<LeagueDetail />} />
      </Route>
    </Routes>
  );
}
