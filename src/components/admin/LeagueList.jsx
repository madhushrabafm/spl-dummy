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
          heading={"League List"}
          linkname={"Add League"}
          link="/admin/league/add"
        />
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg m-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-300 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                League Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Sport Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Teams
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Season
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Age Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Completed
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leagues.map((league) => (
              <tr key={league._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {league.league_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {league.sport_type_id.sport_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {league.teamCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {league.league_year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {league.league_season}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {league.league_age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{league.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {league.completed ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeagueTable;
