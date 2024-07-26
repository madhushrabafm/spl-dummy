// src/components/admin/CoachList.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";

const CoachList = () => {
  const [coaches, setCoaches] = useState([]); // State to store coaches data
  const [error, setError] = useState(null); // State to store any errors
  const [loading, setLoading] = useState(true); // State to indicate loading

  useEffect(() => {
    // Fetch coaches data when component mounts
    const fetchCoaches = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage

        const response = await fetch(
          "https://app.sportsleaguedraft.com/v1/coach/list-super-admin-coach?admin_id=663387b275190600180883c9&page=1&status=Active",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch coaches");
        }

        const data = await response.json();
        setCoaches(data.data); // Set the coaches data from the response
      } catch (err) {
        setError(err.message); // Set error message if request fails
      } finally {
        setLoading(false); // Set loading to false once request is complete
      }
    };

    fetchCoaches();
  }, []); // Empty dependency array means this effect runs once when component mounts

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error message if request fails
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">
        <Header
          heading={"Coaches list"}
          linkname={"add coach"}
          link="/admin/coach/add"
        />
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg m-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                League
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Season
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coaches.map((coach, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coach.league_id.league_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coach.league_id.league_season}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coach.league_id.league_age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coach.coach_id.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coach.coach_id.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coach.coach_id.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900">
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

export default CoachList;
