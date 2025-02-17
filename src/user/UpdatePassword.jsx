import { useState } from "react";
import { useAuth } from "../context/useAuth";

const UpdatePasswordForm = () => {
  const { updatePassword, loading, error } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message
    const result = await updatePassword(currentPassword, newPassword);
    if (result.success) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UpdatePasswordForm;
