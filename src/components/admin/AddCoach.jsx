import React, { useEffect, useState } from "react";
import Header from "./Header";

const AddCoach = () => {
  const [coachData, setCoachData] = useState({
    full_name: "",
    email: "",
    phone: "",
    league_id: "",
    team_id: "",
  });

  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");
  const adminid = localStorage.getItem("adminid");

  useEffect(() => {
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
        console.log("Leagues data:", data);

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

  useEffect(() => {
    if (coachData.league_id) {
      const fetchTeams = async () => {
        try {
          const response = await fetch(
            `https://app.sportsleaguedraft.com/v1/director/director-team-lists?league_id=${coachData.league_id}&admin_id=${adminid}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch teams");
          }

          const data = await response.json();
          console.log("Teams data:", data);

          if (data.isSuccess && Array.isArray(data.data.teams)) {
            setTeams(data.data.teams);
          } else {
            throw new Error("Invalid data format for teams");
          }
        } catch (error) {
          setError(error.message);
        }
      };

      fetchTeams();
    }
  }, [coachData.league_id, adminid, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoachData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !coachData.full_name ||
      !coachData.email ||
      !coachData.phone ||
      !coachData.league_id ||
      !coachData.team_id
    ) {
      setError("All fields are required.");
      return;
    }

    // Prepare the payload
    const payload = {
      full_name: coachData.full_name,
      email: coachData.email,
      phone: coachData.phone,
      role: "coach",
      teamInfo: [
        {
          league_id: coachData.league_id,
          team_id: coachData.team_id,
          admin_id: adminid,
        },
      ],
    };

    try {
      const response = await fetch(
        "https://app.sportsleaguedraft.com/v1/coach/create-coach",
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
      console.log("Coach created successfully:", data);

      // if (!response.ok || !data.isSuccess) {
      //   throw new Error("Failed to create coach: " + data.message);
      // }

      setCoachData({
        full_name: "",
        email: "",
        phone: "",
        league_id: "",
        team_id: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error creating coach:", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-full">
      <Header heading="Add Coach" linkname="Go Back" link="/admin/coaches/" />
      <div className="overflow-x-auto px-20">
        <h1 className="text-2xl font-bold my-4">Add New Coach</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-pink-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={coachData.full_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-pink-700 focus:ring focus:ring-pink-700 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={coachData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-pink-700 focus:ring focus:ring-pink-700 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={coachData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-pink-700 focus:ring focus:ring-pink-700 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                League
              </label>
              <select
                name="league_id"
                value={coachData.league_id}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-pink-700 focus:ring focus:ring-pink-700 focus:ring-opacity-50"
                required
              >
                <option value="">Select a league</option>
                {leagues.map((league, idx) => (
                  <option key={idx} value={league._id}>
                    {league.league_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Team
              </label>
              <select
                name="team_id"
                value={coachData.team_id}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-pink-700 focus:ring focus:ring-pink-700 focus:ring-opacity-50"
                required
              >
                <option value="">Select a team</option>
                {teams.map((team, idx) => (
                  <option key={idx} value={team._id || team.id}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </div>
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

export default AddCoach;
