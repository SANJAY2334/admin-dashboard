import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiSettings, FiLogOut, FiUsers, FiActivity, FiUserPlus, FiAlertCircle, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User"); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
    }

    
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName); 
    }

   
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      
      <aside className="w-80 bg-gray-900 p-6 shadow-lg">
        <h2 className="text-4xl font-bold text-center">Dashboard</h2>
        <p className="text-center text-gray-400 text-lg mt-1">
          Welcome, <span className="text-white font-semibold">{userName}</span>
        </p>

        <nav className="mt-8 space-y-4">
          <a
            href="/dashboard"
            className="flex items-center gap-4 px-5 py-4 text-lg font-medium rounded-lg bg-blue-600 hover:bg-blue-700 transition-all shadow-md"
          >
            <FiHome className="text-2xl" /> Home
          </a>
          <a
            href="/settings"
            className="flex items-center gap-4 px-5 py-4 text-lg font-medium rounded-lg hover:bg-gray-800 transition-all"
          >
            <FiSettings className="text-2xl" /> Settings
          </a>
        </nav>
      </aside>

      
      <main className="flex-1 p-12 bg-gray-100 text-gray-900 relative">
        
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold">
            Welcome Back, <span className="text-blue-600">{userName}!</span>
          </h1>

          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 bg-gray-800 text-white px-3 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              <FiUser className="text-2xl" />
              <span className="text-lg font-medium">{userName}</span>
            </button>

            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
                <a
                  href="/profile"
                  className="flex items-center gap-3 px-5 py-2 hover:bg-gray-200 transition-all"
                >
                  <FiUser className="text-lg" /> Profile
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username"); 
                    navigate("/login");
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-200 transition-all"
                >
                  <FiLogOut className="text-lg" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 mt-4 text-xl">
          Here’s an overview of your account.
        </p>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mt-20">
          {[
            { title: "Total Users", count: "1,230", color: "text-blue-600", icon: <FiUsers /> },
            { title: "Active Sessions", count: "320", color: "text-green-600", icon: <FiActivity /> },
            { title: "New Signups", count: "45", color: "text-orange-600", icon: <FiUserPlus /> },
            { title: "Pending Requests", count: "8", color: "text-red-600", icon: <FiAlertCircle /> },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center gap-6"
            >
              <div className={`text-5xl ${stat.color}`}>{stat.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{stat.title}</h3>
                <p className="text-4xl font-bold mt-2">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
