import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Call the mock authentication function
      const mockResponse = await mockAuth(email, password);

      console.log(mockResponse);

      // Store the access token in localStorage
      if (mockResponse.accessToken) {
        localStorage.setItem("accessToken", mockResponse.accessToken);
      }

      if (mockResponse.data.role === "coach") {
        navigate("/coach/dashboard");
      } else if (mockResponse.data.role === "admin") {
        navigate("/admin/team");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("An error occurred during authentication");
    }
  };

  // Async authentication function with fetch
  const mockAuth = async (email, password) => {
    try {
      const response = await fetch(
        "https://app.sportsleaguedraft.com/v1/auth/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Assuming the API returns { role: "coach" } or { role: "admin" }
      return data;
    } catch (err) {
      console.error("Authentication error:", err);
      throw new Error("Authentication failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
