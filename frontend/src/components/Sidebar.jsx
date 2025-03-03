import { Link } from "react-router-dom";
import { Home, LogIn, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed flex flex-col">
      <h1 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
        Dashboard
      </h1>
      
      <nav className="flex-1 p-4 space-y-4">
        <Link to="/dashboard" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
          <Home size={20} /> <span>Home</span>
        </Link>
        <Link to="/login" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
          <LogIn size={20} /> <span>Login</span>
        </Link>
        <Link to="/settings" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
          <Settings size={20} /> <span>Settings</span>
        </Link>
      </nav>

      
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center w-full space-x-3 p-2 rounded hover:bg-gray-700">
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
