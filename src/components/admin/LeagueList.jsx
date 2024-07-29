import React, { useEffect, useState } from "react";
import Header from "./Header";

const LeagueTable = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch(
          "https://app.sportsleaguedraft.com/v1/league/list-super-admin-leagues?admin=663387b275190600180883c9&page=1&status=Active",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leagues");
        }

        const data = await response.json();
        console.log("Leagues data:", data); // Log data for debugging

        if (data.isSuccess && Array.isArray(data.data)) {
          setLeagues(data.data);
        } else {
          throw new Error("Invalid data format for leagues");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [token]);

  console.log(leagues);

  return (
    <div className="w-full ">
      <h1 className="text-2xl font-bold mb-4">
        <Header
          heading={"League List"}
          linkname={"Add League"}
          link="/admin/league/add"
        />
      </h1>
      <div className="p-12">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse border p-12 border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  League Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Sport Type</th>
                <th className="border border-gray-300 px-4 py-2">Teams</th>
                <th className="border border-gray-300 px-4 py-2">Year</th>
                <th className="border border-gray-300 px-4 py-2">Season</th>
                <th className="border border-gray-300 px-4 py-2">Age Group</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Completed</th>
              </tr>
            </thead>
            <tbody>
              {leagues.map((league) => (
                <tr key={league._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {league.league_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {league.sport_type_id.sport_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {league.teamCount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {league.league_year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {league.league_season}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {league.league_age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {league.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {league.completed ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeagueTable;
