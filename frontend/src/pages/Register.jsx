import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import bgImage from "../assets/auth-bg.jpg";
import { Link } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
    if (/@(gmail\.com|outlook\.com)$/.test(email)) return "Only company emails are allowed.";
    return null;
  };

  const validatePassword = (password) => {
    const conditions = [
      { regex: /.{8,}/, message: "At least 8 characters" },
      { regex: /[A-Z]/, message: "At least one uppercase letter" },
      { regex: /[a-z]/, message: "At least one lowercase letter" },
      { regex: /\d/, message: "At least one number" },
      { regex: /[!@#$%^&*]/, message: "At least one special character (!@#$%^&*)" },
    ];
    return conditions.map((condition) => ({
      ...condition,
      valid: condition.regex.test(password),
    }));
  };

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
      const passwordChecks = validatePassword(value);
      if (!passwordChecks.every((check) => check.valid)) {
        newErrors.password = "Password must meet all requirements.";
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
    setSuccess(false);
    setErrorMessage("");
    setLoading(true);

    if (Object.keys(errors).length > 0 || !form.username || !form.email || !form.password || !form.confirmPassword) {
      setErrorMessage("Please fill all fields correctly.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl w-[600px] text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {success && (
          <div className="bg-green-600 text-white p-3 rounded-lg text-center mb-4 flex items-center gap-2">
            <FiCheckCircle className="text-xl" /> Registration Successful! Redirecting...
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-600 text-white p-3 rounded-lg text-center mb-4 flex items-center gap-2">
            <FiAlertCircle className="text-xl" /> {errorMessage}
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
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-400">Password</label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full bg-gray-700 p-3 pl-10 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <ul className="text-sm text-gray-400 mt-2">
              {validatePassword(form.password).map((condition, index) => (
                <li key={index} className={condition.valid ? "text-green-400" : "text-red-400"}>
                  {condition.valid ? "✔" : "✖"} {condition.message}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-gray-400">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-600"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-all flex items-center justify-center disabled:opacity-50"
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div> : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
             <Link to="/login" className="text-blue-500 hover:underline">
               Login here
            </Link>
          </p>
      </div>
    </div>
  );
};

export default Register;
