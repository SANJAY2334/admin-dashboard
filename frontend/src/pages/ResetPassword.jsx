import { useState } from "react";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setLoading(true); // Disable button while submitting

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ User not authenticated.");
      setLoading(false);
      return;
    }

    try {
        console.log("Sending request to reset password:", {
            oldPassword: currentPassword,
            newPassword,
          });
          
       

      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      setMessage("✅ Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        <label className="block mt-4">Current Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-800 mt-1"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <label className="block mt-4">New Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-800 mt-1"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label className="block mt-4">Confirm New Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-800 mt-1"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full mt-6 py-2 rounded ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && (
          <p className={`mt-4 text-center ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
