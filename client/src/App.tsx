import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import Matches from "./pages/Matches";
import LeagueDetail from "./pages/LeagueDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeagues from "./pages/admin/AdminLeagues";
import AdminLeagueForm from "./pages/admin/AdminLeagueForm";
import AdminPlayers from "./pages/admin/AdminPlayers";
import AdminPlayerForm from "./pages/admin/AdminPlayerForm";
import AdminMatches from "./pages/admin/AdminMatches";
import AdminMatchForm from "./pages/admin/AdminMatchForm";

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
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/leagues" element={<AdminLeagues />} />
        <Route path="/admin/leagues/new" element={<AdminLeagueForm />} />
        <Route path="/admin/leagues/:id/edit" element={<AdminLeagueForm />} />
        <Route path="/admin/players" element={<AdminPlayers />} />
        <Route path="/admin/players/new" element={<AdminPlayerForm />} />
        <Route path="/admin/players/:id/edit" element={<AdminPlayerForm />} />
        <Route path="/admin/matches" element={<AdminMatches />} />
        <Route path="/admin/matches/new" element={<AdminMatchForm />} />
        <Route path="/admin/matches/:id/edit" element={<AdminMatchForm />} />
      </Route>
    </Routes>
  );
}
