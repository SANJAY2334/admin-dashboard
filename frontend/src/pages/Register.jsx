import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import axios from "axios"; 

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!validateEmail(form.email)) newErrors.email = "Invalid email format.";
    if (!validatePassword(form.password))
      newErrors.password =
        "Password must be 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register", 
          {
            username: form.username,
            email: form.email,
            password: form.password,
          }
        );
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Server error. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
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
                placeholder="Enter username"
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${
                  errors.username ? "border-yellow-500" : "border-gray-600"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>
            {errors.username && (
              <p className="text-yellow-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          
          <div>
            <label className="block text-gray-400">Email</label>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-500" />
              <input
                type="email"
                placeholder="Enter email"
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${
                  errors.email ? "border-yellow-500" : "border-gray-600"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            {errors.email && (
              <p className="text-yellow-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          
          <div>
            <label className="block text-gray-400">Password</label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-500" />
              <input
                type="password"
                placeholder="Enter password"
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${
                  errors.password ? "border-yellow-500" : "border-gray-600"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
            {errors.password && (
              <p className="text-yellow-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          
          <div>
            <label className="block text-gray-400">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-500" />
              <input
                type="password"
                placeholder="Confirm password"
                className={`w-full bg-gray-700 p-3 pl-10 rounded-lg border ${
                  errors.confirmPassword ? "border-yellow-500" : "border-gray-600"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-yellow-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
            disabled={
              Object.keys(errors).length > 0 ||
              !form.username ||
              !form.email ||
              !form.password ||
              !form.confirmPassword
            }
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
