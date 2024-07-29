import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Coach from "./pages/Coach";
import Admin from "./pages/Admin";
import App from "./App";
import Teams from "./components/admin/Teams";
import CoachList from "./components/admin/CoachList";
import DraftList from "./components/admin/DraftList";
import PlayerList from "./components/admin/PlayerList";
import AddTeams from "./components/admin/AddTeams";
import AddCoach from "./components/admin/AddCoach";
import AddPlayers from "./components/admin/AddPlayers";
import Login from "./pages/Login";
import AddDrafts from "./components/admin/AddDrafts";
import LeagueList from "./components/admin/LeagueList";
import AddLeague from "./components/admin/AddLeague";
// import Live from "./pages/Live";
import AdminLive from "./pages/AdminLive";
import CoachLive from "./pages/CoachLive";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/coach",
    element: (
      <ProtectedRoute allowedRoles={["coach"]}>
        <Coach />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "drafts/live/:id",
        element: <CoachLive />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "team",
        element: <Teams />,
      },
      {
        path: "team/add",
        element: <AddTeams />,
      },
      // ---------------------------------------------------
      {
        path: "coach",
        element: <CoachList />,
      },
      {
        path: "coach/add",
        element: <AddCoach />,
      },
      {
        path: "players",
        element: <PlayerList />,
      },
      {
        path: "player/add",
        element: <AddPlayers />,
      },
      {
        path: "drafts",
        element: <DraftList />,
      },
      {
        path: "drafts/add",
        element: <AddDrafts />,
      },
      {
        path: "league",
        element: <LeagueList />,
      },
      {
        path: "league/add",
        element: <AddLeague />,
      },
      {
        path: "drafts/live/:id",
        element: <AdminLive />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
