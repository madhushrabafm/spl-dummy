// src/components/admin/AddTeams.jsx
import React, { useState } from "react";
import Header from "./Header";

const AddTeams = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    organizationName: "",
    leagueName: "",
    coachName: "",
    players: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full h-full">
      <Header heading="Add Teams" linkname="Go Back" link="/admin/team/" />
      <div className="overflow-x-auto px-20 ">
        <h1 className="text-2xl font-bold my-4">Add New Team</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                League Name
              </label>
              <input
                type="text"
                name="leagueName"
                value={formData.leagueName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Coach Name
              </label>
              <input
                type="text"
                name="coachName"
                value={formData.coachName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Players
              </label>
              <input
                type="text"
                name="players"
                value={formData.players}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 my-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeams;
