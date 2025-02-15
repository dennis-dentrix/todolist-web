import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { StyledLink } from "../styles/Styles";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  text-align: center;
`;

const ResetPasswordForm = styled.form`
  margin: 20px auto;
  padding: 30px;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SiteName = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Description = styled.p`
  text-align: center;
  color: #777;
  margin-bottom: 25px;
  font-size: 0.9em;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: #007bff;
  border: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  display: block;
  padding: 12px 20px;
  border-radius: 6px;
  text-align: center;
  font-size: 1em;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const ActionButtons = styled.div`
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { resetPassword, error } = useAuth();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault();
    await resetPassword(token, password, confirmPassword);

    // If reset is successful and no error is set, navigate to login or home
    if (!error) {
      navigate("/login"); // Redirect to login page after successful reset
    }
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <PageContainer>
      <SiteName>Task Manager</SiteName>
      <ResetPasswordForm onSubmit={handleSubmit}>
        <Title>Reset Password</Title>
        <Description>Enter your new password.</Description>
        {message && <p>{message}</p>}
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <ActionButtons>
          <Button type="submit">Reset Password</Button>
          <StyledLink type="submit">Back To login</StyledLink>
        </ActionButtons>
      </ResetPasswordForm>
    </PageContainer>
  );
};

export default ResetPassword;
