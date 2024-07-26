// src/components/admin/PlayerList.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an asynchronous function to fetch the data
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage

        const response = await fetch(
          "https://app.sportsleaguedraft.com/v1/player/player-super-admin-lists?admin_id=663387b275190600180883c9&page=1&status=Active",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch player data");
        }

        const data = await response.json();

        // Ensure the response contains the 'data' array
        if (data.isSuccess && Array.isArray(data.data)) {
          setPlayers(data.data);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">
        <Header
          heading={"Players List"}
          linkname={"Add player"}
          link="/admin/player/add"
        />
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg m-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Player Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                League Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Coach
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {player.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {player.team_id?.team_name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {player.league_id.league_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{player.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {player.coach_id?.full_name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-pink-600 hover:text-pink-900">
                    Edit
                  </button>
                  <button className="ml-4 text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerList;
