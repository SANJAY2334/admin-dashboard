import { Link, useNavigate } from "react-router-dom";
import { Home, LogIn, Settings, LogOut, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed flex flex-col">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-6 border-b border-gray-700">
        <img src="/path-to-your-logo.png" alt="Logo" className="h-16 w-16 mb-2" /> 
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <button
  onClick={toggleTheme}
  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
>
  {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>


      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-4">
        <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded bg-amber-50 hover:bg-gray-700 transition ">
          <Home size={20}  /> <span>Home</span>
        </Link>
        <Link to="/login" className="flex items-center space-x-3 p-3 rounded bg-amber-50 hover:bg-gray-700 transition">
          <LogIn size={20} /> <span>Login</span>
        </Link>
        <Link to="/settings" className="flex items-center space-x-3 p-3 rounded bg-amber-50 hover:bg-gray-700 transition">
          <Settings size={20} /> <span>Settings</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full space-x-3 p-3 rounded hover:bg-red-600 transition"
        >
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
