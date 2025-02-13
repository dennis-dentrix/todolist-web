/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; //Profile Picture Icon

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

const ProfilePictureSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePictureIcon = styled(AccountCircleIcon)`
  font-size: 5em;
  margin-right: 20px;
  color: #999;
`;

const ProfilePictureButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const InputField = styled(TextField)`
  margin-bottom: 20px;
`;

const UsernameSection = styled.div`
  margin-bottom: 20px;
`;

const AvailableChangeText = styled.p`
  font-size: 0.8em;
  color: #777;
`;

const ActionButtons = styled.div`
  padding-top: 1.3rem;
  display: flex;
  justify-content: space-between;
`;

const SaveChangesButton = styled(Button)`
  && {
    background-color: #6c757d;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;

    &:hover {
      background-color: #5a6268;
    }
  }
`;

const ButtonStyled = styled(Button)`
  && {
    background-color: #f44336; /* Red color */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 10px;

    &:hover {
      background-color: #d32f2f; /* Darker red on hover */
    }
  }
`;

const User = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("Kevin Heart"); // Initial value
  const [username, setUsername] = useState("kevinunhuy"); // Initial value

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSaveChanges = () => {
    // Implement your save changes logic here (e.g., API call)
    alert("Changes saved (not really, this is a demo)");
  };

  const handleDeleteAccount = () => {
    // Implement your delete account logic here (e.g., API call)
    alert("Account deleted (not really, this is a demo)");
    handleLogout();
    navigate("/login");
  };

  return (
    <UserContainer>
      <SectionTitle>Profile picture</SectionTitle>
      <ProfilePictureSection>
        <ProfilePictureIcon />
        <ProfilePictureButtons>
          <Button variant="contained">Change picture</Button>
          <Button variant="outlined">Delete picture</Button>
        </ProfilePictureButtons>
      </ProfilePictureSection>

      <SectionTitle>Email</SectionTitle>
      <InputField
        disabled
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => handleInputChange(e, setEmail)}
      />

      <SectionTitle>Username</SectionTitle>
      <UsernameSection>
        <InputField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => handleInputChange(e, setUsername)}
        />
        <AvailableChangeText>
          Available change in 25/04/2024
        </AvailableChangeText>
      </UsernameSection>

      <ActionButtons>
        <SaveChangesButton variant="contained" onClick={handleSaveChanges}>
          Save changes
        </SaveChangesButton>
        <ButtonStyled variant="contained" onClick={handleLogout}>
          Logout
        </ButtonStyled>
        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </ButtonStyled>
      </ActionButtons>
    </UserContainer>
  );
};

export default User;
