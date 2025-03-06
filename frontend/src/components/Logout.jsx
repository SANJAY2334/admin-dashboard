import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Redirect to login page after logout
    navigate("/login", { replace: true });
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
    >
      Logout
    </button>
  );
};

export default Logout;
