import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          // localStorage.setItem("isLoggedIn", "true");
          navigate('/home');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="flex justify-center items-center bg-gray-600 min-h-screen px-4">
        <div className="bg-white p-6 rounded w-full max-w-sm md:max-w-md lg:max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                autoComplete="off"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                autoComplete="off"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">Don't Have an Account?</p>
          <Link
            to="/register"
            className="flex justify-center items-center w-full mt-2 border border-gray-300 bg-gray-100 py-2 rounded hover:bg-gray-200 transition-colors duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
