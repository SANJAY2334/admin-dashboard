import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiSettings,
  FiLogOut,
  FiActivity,
  FiUser,
  FiMenu,
  FiAlertCircle,
  FiBell,
} from "react-icons/fi";
import ChartComponent from "../components/ChartComponent";
import CalendarWidget from "../components/CalendarWidget";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return !prev;
    });
  };

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New ticket assigned to you", type: "ticket", read: false },
    { id: 2, message: "Server issue resolved", type: "system", read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUserName = localStorage.getItem("username");
    if (storedUserName && storedUserName !== "null" && storedUserName !== "undefined") {
      setUserName(storedUserName);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 p-6 shadow-lg border-r border-gray-700 transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-all"
        >
          <FiMenu className="text-2xl" />
          {sidebarOpen && <span className="text-lg font-medium">Menu</span>}
        </button>

        {/* Sidebar Navigation */}
        <h2 className={`text-2xl font-bold text-center ${!sidebarOpen && "hidden"}`}>Dashboard</h2>
        <p className={`text-center text-gray-400 mt-1 ${!sidebarOpen && "hidden"}`}>
          Welcome, <span className="text-white font-semibold">{userName}</span>
        </p>

        <nav className="mt-8 space-y-2">
          {[
            { name: "Overview", path: "/dashboard", icon: <FiHome /> },
            { name: "Profile", path: "/profile", icon: <FiUser /> },
            { name: "Tickets", path: "/tickets", icon: <FiActivity /> },
            { name: "Settings", path: "/settings", icon: <FiSettings /> },
            
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-lg hover:bg-green-600 transition-all"
            >
              {item.icon}
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-900 text-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Welcome Back, <span className="text-green-400">{userName}!</span>
          </h1>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              className="relative p-3 bg-gray-800 rounded-full hover:bg-gray-700"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <FiBell className="text-xl text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-xs text-white px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700">
                <div className="p-3 border-b border-gray-700 font-bold">Notifications</div>

                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 border-b border-gray-800 ${
                        notif.read ? "text-gray-400" : "text-white font-bold"
                      }`}
                    >
                      {notif.message}
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-400">No new notifications</div>
                )}

                <button
                  onClick={() => setNotifications([])}
                  className="w-full text-center text-red-400 py-2 hover:bg-gray-800 transition-all"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-gray-800 px-5 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              <FiUser className="text-2xl" />
              <span className="text-lg">{userName}</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                <Link to="/profile" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-700 transition-all">
                  <FiUser className="text-lg" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-700 transition-all"
                >
                  <FiLogOut className="text-lg" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Charts & Calendar */}
        <h1 className="text-3xl font-bold text-white mt-10">Dashboard Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ChartComponent type="line" />
          <ChartComponent type="bar" />
        </div>

        <h1 className="text-3xl font-bold text-white mt-10">Upcoming Schedules</h1>
        <CalendarWidget />
      </main>
    </div>
  );
};

export default Dashboard;
