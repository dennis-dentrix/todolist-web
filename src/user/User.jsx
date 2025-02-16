import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Button, TextField, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import PageRedirect from "../utils/PageRedirect";

const UserContainer = styled.div`
  padding: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 30px auto;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
`;

const InputField = styled(TextField)`
  margin-bottom: 20px;
`;

const ActionButtons = styled.div`
  padding-top: 1.3rem;
  display: flex;
  justify-content: space-between;
`;

const SaveChangesButton = styled(Button)`
  && {
    background-color: #6c757d; /* Bootstrap secondary color */
    color: white;
    padding: 12px 20px;
    border-radius: 6px;

    &:hover {
      background-color: #5a6268; /* Darker on hover */
    }
  }
`;

const ButtonStyled = styled(Button)`
  && {
    background-color: #f44336; /* Red color */
    color: white;
    padding: 10px 15px;
    border-radius: 4px;

    &:hover {
      background-color: #d32f2f; /* Darker red on hover */
    }
  }
`;

const User = () => {
  const navigate = useNavigate();
  const { logout, user, updatePassword } = useAuth();

  const [email] = useState(user?.email || ""); // Set initial value from user context
  const [username, setUsername] = useState(user?.name || ""); // Set initial value
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Optional effect to set username if user changes
  useEffect(() => {
    setUsername(user?.name || "");
  }, [user]);

  const handleInputChange = (e) => {
    setUsername(e.target.value); // Directly update username
  };

  const handleSaveChanges = () => {
    // Implement your save changes logic here (e.g., API call)
    alert("Changes saved (not really, this is a demo)");
  };

  // const handleDeleteAccount = () => {
  //   alert("Account deleted (not really, this is a demo)");
  //   handleLogout();
  //   navigate("/login");
  // };

  const handleLogout = async () => {
    try {
      await logout();
      setSnackbarMessage("Logged out successfully!"); // Set the snackbar message
      setSnackbarOpen(true); // Open the snackbar
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(currentPassword, newPassword);
      setSnackbarMessage("Password updated successfully!");
      setSnackbarOpen(true);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Update password error:", error);
      setSnackbarMessage("Password update failed. Try again!");
      setSnackbarOpen(true);
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <UserContainer>
      {/* <PageRedirect /> */}
      <SectionTitle>Email</SectionTitle>
      <InputField disabled fullWidth label="Email" value={email} />

      <SectionTitle>Username</SectionTitle>
      <InputField
        fullWidth
        label="Username"
        value={username}
        onChange={handleInputChange}
      />

      <SectionTitle>Update Password</SectionTitle>
      <InputField
        fullWidth
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <InputField
        fullWidth
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <ActionButtons>
        <SaveChangesButton variant="contained" onClick={handleSaveChanges}>
          Save Changes
        </SaveChangesButton>

        <ButtonStyled variant="contained" onClick={handleUpdatePassword}>
          Update Password
        </ButtonStyled>
        <ButtonStyled variant="contained" onClick={handleLogout}>
          Logout
        </ButtonStyled>
        {/* <ButtonStyled variant="contained" onClick={handleDeleteAccount}>
          Delete Account
        </ButtonStyled> */}
      </ActionButtons>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </UserContainer>
  );
};

export default User;
