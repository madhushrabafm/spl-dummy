// src/components/admin/AddTeams.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const AddTeams = () => {
  const [leagues, setLeagues] = useState([]);
  const nav = useNavigate();
  const [teams, setTeams] = useState([
    {
      teamName: "",
      leagueName: "",
      teamPicture: null,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");
  const adminid = localStorage.getItem("adminid");

  // Handle input changes for a specific team
  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedTeams = [...teams];

    if (name === "teamPicture") {
      // Handle file input
      updatedTeams[index][name] = files[0];
    } else {
      updatedTeams[index][name] = value;
    }

    setTeams(updatedTeams);
  };

  // Add more team input fields
  const handleAddTeam = () => {
    setTeams([
      ...teams,
      {
        teamName: "",
        leagueName: "",
        teamPicture: null,
      },
    ]);
  };

  // Remove a team input field
  const handleRemoveTeam = (index) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for any empty fields or invalid leagues
    for (const team of teams) {
      if (!team.teamName || !team.leagueName) {
        setError("Please fill out all fields for each team.");
        return;
      }
    }

    // Prepare the array of team objects
    const teamPayloads = teams.map((team) => ({
      admin_id: adminid,
      team_name: team.teamName,
      league_id: team.leagueName,
      team_picture: team.teamPicture,
    }));

    try {
      // Send the payload as JSON
      const response = await fetch(
        "https://app.sportsleaguedraft.com/v1/team/create-team",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teamPayloads),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!data.isSuccess) {
        throw new Error("Failed to create teams: " + data.message);
      } else {
        console.log("Teams created successfully:", data);

        // Reset form after successful submission
        setTeams([
          {
            teamName: "",
            leagueName: "",
            teamPicture: null,
          },
        ]);
        nav("/admin/team");
        alert("success");
        setError(null);
      }
    } catch (error) {
      // console.error("Error creating teams:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    // Fetch leagues from the API
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
        console.log(data?.data, "<<<<<<<<<<<,");

        if (data.isSuccess && Array.isArray(data.data)) {
          setLeagues(data.data);
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

  return (
    <div className="w-full h-full">
      <Header heading="Add Teams" linkname="Go Back" link="/admin/team/" />
      <div className="overflow-x-auto px-20">
        <h1 className="text-2xl font-bold my-4">Add New Team</h1>
        {loading ? (
          <p>Loading leagues...</p>
        ) : error ? (
          <p className="text-pink-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {teams.map((team, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-7 md:grid-cols-2"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Team Name
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={team.teamName}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-pink-700 focus:ring focus:ring-pink-700 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    League
                  </label>
                  <select
                    name="leagueName"
                    value={team.leagueName}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-pink-700 focus:ring focus:ring-pink-700 focus:ring-opacity-50"
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

                {teams.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTeam(index)}
                    className="bg-pink-500 text-white px-4 py-2 h-fit my-3 block rounded-md hover:bg-pink-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTeam}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add More
            </button>
            <button
              type="submit"
              className="bg-pink-700 text-white px-4 py-2 rounded-md hover:bg-pink-600"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTeams;
