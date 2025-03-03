import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    
    
    if (form.username && form.password) {
      localStorage.setItem("token", "dummy_token"); 
      localStorage.setItem("username", form.username); 
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:outline-none"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
