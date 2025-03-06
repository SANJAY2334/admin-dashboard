import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
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
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format.";
    if (!validatePassword(formData.password))
      newErrors.password = "Password must be 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.";
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

        // Store user data
        localStorage.setItem("username", formData.username);

        // Reset form
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });

        // Redirect
        navigate("/dashboard");
      } catch (error) {
        setMessage(error.response?.data?.message || "Registration failed");
        console.error("Registration failed:", error.response?.data || error.message);
      }
    } else {
      setMessage("Please fix the errors in the form.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {message && <p className={`text-sm mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        {[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
          { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
        ].map(({ name, type, placeholder }) => (
          <div key={name}>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required
              className={`p-2 border rounded w-full ${errors[name] ? "border-red-600" : "border-gray-300"}`}
            />
            {errors[name] && <p className="text-red-600 text-sm">{errors[name]}</p>}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={Object.keys(errors).length > 0}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
