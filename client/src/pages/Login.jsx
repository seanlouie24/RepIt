import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="mx-auto max-w-sm p-4 bg-gray-800 min-h-screen">
      <br></br>
      <h1 className="font-anton text-center text-8xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">RepIt</h1>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-100">
        <h2 className="font-inter text-center text-6xl font-bold mb-6 text-gray-100">Login</h2>
        <div className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="rounded-2xl mt-2 w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white transition"
            type="submit"
          >
            Log In
          </button>
        </div>
        <br />
        <h4 className="text-xl font-bold mb-2 text-gray-100">New User?</h4>
        <button
          className="rounded-2xl mt-2 w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white transition"
          type="button"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
