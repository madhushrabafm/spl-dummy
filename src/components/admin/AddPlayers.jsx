// src/components/admin/AddPlayer.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";

const AddPlayer = () => {
  const [leagues, setLeagues] = useState([]);
  const [formData, setFormData] = useState({
    leagueId: "",
    file: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage

  useEffect(() => {
    // Fetch leagues from the API
    const fetchLeagues = async () => {
      try {
        const response = await fetch(
          "https://app.sportsleaguedraft.com/v1/admin/list-all-organisation",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your actual access token
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leagues");
        }

        const data = await response.json();
        console.log(data?.data?.results, "<<<<<<<<<<<,");

        if (data.isSuccess && Array.isArray(data.data?.results)) {
          setLeagues(data.data?.results);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError(null);
    setSuccessMessage("");

    if (!formData.file || !formData.leagueId) {
      setError("Please select a league and upload a file.");
      return;
    }

    const payload = new FormData();
    payload.append("file", formData.file);
    payload.append("admin_id", "663387b275190600180883c9");
    payload.append("league_id", formData.leagueId);
    payload.append("is_player_selected", "false");

    try {
      const response = await fetch(
        "https://app.sportsleaguedraft.com/v1/player/upload-excel-and-create-players",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        }
      );

      const result = await response.json();
      console.log(result, "Upload Response <<<<<<<<<<<");

      if (!response.ok) {
        throw new Error(
          `Error: ${result.message || "Failed to upload and create players"}`
        );
      }

      if (result.isSuccess) {
        setSuccessMessage("Players added successfully!");
        setFormData({ leagueId: "", file: null });
      } else {
        throw new Error(result.message || "Unknown error occurred");
      }
    } catch (error) {
      setError(error.message);
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="w-full ">
      <h1 className="text-2xl font-bold mb-4">
        <Header
          heading="Add Player"
          linkname="Back to Player List"
          link="/admin/player"
        />
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <div>Loading leagues...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  League
                </label>
                <select
                  name="leagueId"
                  value={formData.leagueId}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select a league</option>
                  {leagues.map((league) => (
                    <option key={league.id} value={league.id}>
                      {league.league_name}
                      mkedn
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Excel File
                </label>
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
                  className="mt-1 block w-full border p-2 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPlayer;
