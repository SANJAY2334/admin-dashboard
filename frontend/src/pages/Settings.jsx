import { useState } from "react";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
        },
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password updated successfully!");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message || "Error updating password");
      }
    } catch (error) {
      setMessage("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <div className="mt-3">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 bg-gray-800 rounded-lg text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 bg-gray-800 rounded-lg text-white mt-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={handlePasswordReset}
            className="mt-3 bg-green-600 px-5 py-2 rounded-lg hover:bg-green-500 disabled:bg-gray-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          {message && <p className="mt-2 text-red-400">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Settings;
