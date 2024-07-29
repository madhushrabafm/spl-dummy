import React, { useEffect, useState } from "react";

const AddDrafts = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  const adminid = localStorage.getItem("adminid");

  useEffect(() => {
    // Fetch leagues when component mounts
    const fetchLeagues = async () => {
      try {
        const response = await fetch(
          `https://app.sportsleaguedraft.com/v1/league/list-leagues?admin=${adminid}`,
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
  }, [adminid, token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!selectedLeague || !date || !time) {
      setError("All fields are required.");
      return;
    }

    // Prepare the payload
    const payload = {
      league_id: selectedLeague,
      admin_id: adminid,
      date: date,
      time: time,
    };

    try {
      const response = await fetch(
        "https://app.sportsleaguedraft.com/v1/draft/create-draft",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        throw new Error("Failed to create draft: " + data.message);
      }

      console.log("Draft created successfully:", data);

      // Reset form after successful submission
      setSelectedLeague("");
      setDate("");
      setTime("");
      setError(null);
    } catch (error) {
      console.error("Error creating draft:", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-full p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Draft</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex    gap-4  justify-between items-end o"
        >
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              League
            </label>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Select a league</option>
              {leagues.map((league) => (
                <option key={league._id} value={league._id}>
                  {league.league_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 "
          >
            Create Draft
          </button>
        </form>
      )}
    </div>
  );
};

export default AddDrafts;
