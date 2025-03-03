import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format.";
    if (!validatePassword(formData.password))
      newErrors.password =
        "Password must be 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before request

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", formData);
        setMessage("User registered successfully!");
        console.log("User registered:", response.data);

        
        localStorage.setItem("username", formData.username);

        
        setFormData({ username: "", name: "", email: "", password: "", confirmPassword: "" });

        
        navigate("/dashboard");
      } catch (error) {
        setMessage("Registration failed! " + (error.response?.data?.message || error.message));
        console.error("Registration failed:", error.response?.data || error.message);
      }
    } else {
      setMessage("Please fix the errors in the form.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {message && <p className="text-sm text-red-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className={`p-2 border rounded ${errors.username ? "border-red-600" : "border-gray-300"}`}
        />
        {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}

        
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`p-2 border rounded ${errors.name ? "border-red-600" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`p-2 border rounded ${errors.email ? "border-red-600" : "border-gray-300"}`}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={`p-2 border rounded ${errors.password ? "border-red-600" : "border-gray-300"}`}
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={`p-2 border rounded ${errors.confirmPassword ? "border-red-600" : "border-gray-300"}`}
        />
        {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}

        
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          disabled={Object.keys(errors).length > 0}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
