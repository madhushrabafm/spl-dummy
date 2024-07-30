import React, { useEffect, useState } from "react";
import Header from "./Header";

// Replace with your actual API endpoint
const token = localStorage.getItem("accessToken");
const adminid = localStorage.getItem("adminid");
const API_URL = `https://app.sportsleaguedraft.com/v1/team/list-super-admin-team?admin_id=${adminid}&page=1&status=Active`;

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTeams(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(teams);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">
        <Header
          heading={"Teams List"}
          linkname={"Add More"}
          link="/admin/team/add"
        />
      </h1>
      <div className="overflow-x-auto shadow-md rounded-lg m-4">
        <table className="w-full">
          <thead className="bg-rose-800/90  text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Organization Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Coach Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Coach Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Players
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white  divide-y divide-gray-200">
            {teams.map((team) => (
              <tr key={team.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {team.team_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {team?.league_id?.league_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {team?.coach?.full_name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {team?.coach?.email || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {team.playerCountObject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{team.status}</td>
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

export default Teams;
