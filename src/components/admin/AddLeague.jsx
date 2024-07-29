import React, { useEffect, useState } from "react";

const AddLeague = () => {
  const [sports, setSports] = useState([]);
  const [packages, setPackages] = useState([]);
  const [leagueData, setLeagueData] = useState({
    league_name: "",
    league_season: "",
    league_age: "",
    league_year: "",
    sport_type_id: "",
    package: "",
    card_number: "",
    exp_month: "",
    exp_year: "",
    cvv: "",
    gender: "",
  });
  const [loadingSports, setLoadingSports] = useState(true);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("accessToken");
  const adminid = localStorage.getItem("adminid");

  // Fetch sports data
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(
          "https://app.sportsleaguedraft.com/v1/sport/list-of-sport",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch sports");
        }

        const data = await response.json();
        if (data.isSuccess && Array.isArray(data.data)) {
          setSports(data.data);
        } else {
          throw new Error("Invalid data format for sports");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingSports(false);
      }
    };

    fetchSports();
  }, [token]);

  // Fetch packages data
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://app.sportsleaguedraft.com/v1/package/list-of-package",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data = await response.json();
        if (data.isSuccess && Array.isArray(data.data)) {
          setPackages(data.data);
        } else {
          throw new Error("Invalid data format for packages");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, [token]);

  console.log(packages);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeagueData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    const requiredFields = [
      "league_name",
      "league_season",
      "league_age",
      "league_year",
      "sport_type_id",
      "package",
      "card_number",
      "exp_month",
      "exp_year",
      "cvv",
      "gender",
    ];

    for (const field of requiredFields) {
      if (!leagueData[field]) {
        setError(`The ${field.replace(/_/g, " ")} field is required.`);
        return;
      }
    }

    const payload = {
      admin_id: adminid,
      sport_type_id: leagueData.sport_type_id,
      league_name: leagueData.league_name,
      league_season: leagueData.league_season,
      league_age: leagueData.league_age,
      league_year: leagueData.league_year,
      package: leagueData.package,
      gender: leagueData.gender,
    };

    try {
      const response = await fetch(
        "https://app.sportsleaguedraft.com/v1/league/create-league",
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
        throw new Error("Failed to create league: " + data.message);
      }

      setSuccess("League created successfully!");

      // Reset form after successful submission
      setLeagueData({
        league_name: "",
        league_season: "",
        league_age: "",
        league_year: "",
        sport_type_id: "",
        package: "",
        card_number: "",
        exp_month: "",
        exp_year: "",
        cvv: "",
        gender: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error creating league:", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold mb-4">Add New League</h1>
      {loadingSports || loadingPackages ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                League Name
              </label>
              <input
                type="text"
                name="league_name"
                value={leagueData.league_name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Season
              </label>
              <input
                type="text"
                name="league_season"
                value={leagueData.league_season}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age Group
              </label>
              <input
                type="text"
                name="league_age"
                value={leagueData.league_age}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="text"
                name="league_year"
                value={leagueData.league_year}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sport
              </label>
              <select
                name="sport_type_id"
                value={leagueData.sport_type_id}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              >
                <option value="">Select a sport</option>
                {sports.map((sport) => (
                  <option key={sport._id} value={sport.id}>
                    {sport.sport_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Package
              </label>
              <select
                name="package"
                value={leagueData.package}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              >
                <option value="">Select a package</option>
                {packages.map((pkg) => (
                  <option key={pkg._id} value={pkg.id}>
                    {pkg.package_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={leagueData.gender}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="card_number"
                value={leagueData.card_number}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Month
              </label>
              <input
                type="text"
                name="exp_month"
                value={leagueData.exp_month}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Year
              </label>
              <input
                type="text"
                name="exp_year"
                value={leagueData.exp_year}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={leagueData.cvv}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2.5 rounded-md h-fit self-end hover:bg-blue-600"
            >
              Create League
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddLeague;
