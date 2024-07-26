// src/components/admin/DraftList.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";

const DraftList = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an asynchronous function to fetch the data
    const fetchDrafts = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage

        const response = await fetch(
          "https://app.sportsleaguedraft.com/v1/draft/list-of-drafts?admin_id=663387b275190600180883c9&page=1", // Replace with the correct endpoint
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Replace with the actual token
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch draft data");
        }

        const data = await response.json();

        // Ensure the response contains the 'data' array
        if (data.isSuccess && Array.isArray(data.data)) {
          setDrafts(data.data);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
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
          heading={"Draft List"}
          linkname={"Add Draft"}
          link="/admin/drafts/add"
        />
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg m-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                League Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Meeting Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drafts.map((draft) => (
              <tr key={draft.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {draft.league_id.league_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={draft.meeting_link}
                    className="text-pink-600 hover:text-pink-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {draft.meeting_link}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{draft.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{draft.time}</td>
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

export default DraftList;
