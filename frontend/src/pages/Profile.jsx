import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiSettings, FiEdit2, FiArrowLeft } from "react-icons/fi";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const storedUser = {
      name: localStorage.getItem("username") || "John Doe",
      email: localStorage.getItem("email")||"johndoe@example.com",
      role: "Admin",
    };
    setUser(storedUser);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <FiArrowLeft /> Back to Dashboard
      </button>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-gray-900">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FiUser className="text-blue-600" /> Profile
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FiUser className="text-gray-600 text-xl" />
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-gray-500">Full Name</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiMail className="text-gray-600 text-xl" />
            <div>
              <p className="text-lg font-semibold">{user.email}</p>
              <p className="text-gray-500">Email Address</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiSettings className="text-gray-600 text-xl" />
            <div>
              <p className="text-lg font-semibold">{user.role}</p>
              <p className="text-gray-500">User Role</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert("Edit Profile Coming Soon!")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
        >
          <FiEdit2 /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
