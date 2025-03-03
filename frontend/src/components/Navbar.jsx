import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 fixed w-full left-64 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="space-x-6">
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/settings" className="hover:underline">Settings</Link>
        <button className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
