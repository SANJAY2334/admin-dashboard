import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username") || "John Doe";
    const userEmail = localStorage.getItem("email") || "johndoe@example.com";
    setName(username);
    setEmail(userEmail);
  }, []);

  const handleSave = () => {
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    alert("Profile updated successfully!");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <button
        onClick={() => navigate("/profile")}
        className="self-start flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <FiArrowLeft /> Back to Profile
      </button>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-gray-900">
        <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
        >
          <FiSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
