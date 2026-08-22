import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formDataImage = new FormData();

      formDataImage.append("image", file);

      const response = await axios.post(
        "https://hackathon-backend-seven-jet.vercel.app/api/image/upload",
        formDataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

      setFormData((prev) => ({
        ...prev,
        imageUrl: response.data.imageUrl,
      }));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post(
        "https://hackathon-backend-seven-jet.vercel.app/api/auth/register",
        formData,
      );

      console.log(response.data);

      setSuccess("Account created successfully! 🎉");

      setFormData({
        name: "",
        email: "",
        number: "",
        password: "",
        imageUrl: "",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Account ✨
            </h1>

            <p className="text-gray-500 mt-2">Join us and get started today</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3">
              {success}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Habib Ali"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              {/* Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="03001234567"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              {/* Image */}
              <div className="sm:col-span-2">
                <label
                  className="flex justify-center text-sm font-medium text-pink-700 mb-2"
                  htmlFor="image"
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="avatarGradient"
                        x1="0"
                        y1="0"
                        x2="64"
                        y2="64"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stop-color="#818CF8" />
                        <stop offset="100%" stop-color="#6366F1" />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="32"
                      cy="32"
                      r="30"
                      stroke="#C7D2FE"
                      stroke-width="2"
                      stroke-dasharray="4 4"
                      fill="#EEF2FF"
                    />

                    <circle cx="32" cy="26" r="9" fill="#C7D2FE" />
                    <path
                      d="M14 50c1.5-9 8.5-14 18-14s16.5 5 18 14"
                      fill="#C7D2FE"
                    />

                    <circle
                      cx="46"
                      cy="46"
                      r="12"
                      fill="url(#avatarGradient)"
                      stroke="white"
                      stroke-width="2.5"
                    />

                    <path
                      d="M46 40v9M46 40l-4 4M46 40l4 4"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M41 50h10"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </label>

                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-200"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1" />

            <span className="text-sm text-gray-400">OR</span>

            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Sign in */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-5">
          © 2026 Student Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Register;
