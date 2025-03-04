import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import bgImage from "../assets/auth-bg.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
    if (/@(gmail\.com|outlook\.com)$/.test(email)) return "Only company emails are allowed.";
    return null;
  };

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    let newErrors = { ...errors };

    if (name === "email") {
      const emailError = validateEmail(value);
      if (emailError) newErrors.email = emailError;
      else delete newErrors.email;
    }

    if (name === "password") {
      if (!validatePassword(value)) {
        newErrors.password = "Password must be 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
      } else {
        delete newErrors.password;
      }
    }

    if (name === "confirmPassword") {
      if (value !== form.password) newErrors.confirmPassword = "Passwords do not match.";
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && form.username && form.email && form.password && form.confirmPassword) {
      try {
        await axios.post("http://localhost:5000/api/auth/register", form);
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Server error. Please try again later.");
      }
    }
  };

  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl w-150 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {success && (
          <div className="bg-green-600 text-white p-3 rounded-lg text-center mb-4 flex items-center gap-2">
            <FiCheckCircle className="text-xl" /> Registration Successful!
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-600 text-white p-3 rounded-lg text-center mb-4 flex items-center gap-2">
            <FiCheckCircle className="text-xl" /> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-400">Username</label>
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-500" />
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="w-full bg-gray-700 p-3 pl-10 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400">Email</label>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${errors.email ? "border-yellow-500" : "border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-yellow-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-400">Password</label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${errors.password ? "border-yellow-500" : "border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <p className="text-yellow-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-gray-400">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${errors.confirmPassword ? "border-yellow-500" : "border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && <p className="text-yellow-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
            disabled={Object.keys(errors).length > 0 || !form.username || !form.email || !form.password || !form.confirmPassword}
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
