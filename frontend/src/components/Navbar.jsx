import { Link } from "react-router-dom";
import Logout from "./Logout"; // Import Logout component

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 fixed w-full left-64 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="space-x-6 flex items-center">
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/settings" className="hover:underline">Settings</Link>
        <Logout /> {/* Use the Logout component for better functionality */}
      </div>
    </nav>
  );
};

export default Navbar;
