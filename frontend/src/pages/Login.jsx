import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiAlertCircle, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import bgImage from "../assets/auth-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberMe");
    if (savedEmail) setForm((prev) => ({ ...prev, email: savedEmail }));

    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

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

  const passwordChecks = useMemo(() => validatePassword(form.password), [form.password]);
  const isPasswordValid = passwordChecks.every((check) => check.valid);

  const isCompanyEmail = (email) => {
    const companyDomainRegex = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|outlook\.com)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return companyDomainRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!isCompanyEmail(form.email)) {
      setError("Only company emails are allowed.");
      setLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet the required conditions.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", form);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user?.username || "User");

        if (rememberMe) {
          localStorage.setItem("rememberMe", form.email);
        } else {
          localStorage.removeItem("rememberMe");
        }

        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl w-[600px] text-white">
        <h2 className="text-3xl font-bold text-center mb-9">Login</h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg text-center flex items-center gap-2">
            <FiAlertCircle className="text-xl" /> {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded-lg text-center flex items-center gap-2">
            <FiCheckCircle className="text-xl" /> {successMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 mt-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-400">Company Email</label>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-500" />
              <input
                type="email"
                placeholder="Enter your company email"
                className="w-full bg-gray-700 p-3 pl-10 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-400">Password</label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-500" />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-gray-700 p-3 pl-10 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <ul className="text-sm text-gray-400 mt-2">
              {passwordChecks.map((condition, index) => (
                <li key={index} className={condition.valid ? "text-green-400" : "text-red-400"}>
                  {condition.valid ? "✔" : "✖"} {condition.message}
                </li>
              ))}
            </ul>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="rememberMe" className="text-gray-400 text-sm">Remember Me</label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-all flex items-center justify-center disabled:opacity-50"
            disabled={loading || !isPasswordValid}
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              "Login"
            )}
          </button>

          {/* Register Link */}
          <p className="text-gray-400 text-center mt-2">
            Don't have an account? <a href="/register" className="text-blue-400 hover:underline">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
