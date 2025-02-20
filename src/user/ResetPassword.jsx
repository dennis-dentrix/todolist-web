import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { AuthenticateBtn, StyledLink } from "../styles/Styles";

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

// const Button = styled.button`
//   background-color: #007bff;
//   color: white;
//   padding: 10px 15px;
//   border: none;
//   border-radius: 6px;
//   font-size: 1em;
//   cursor: pointer;
//   width: 100%;
//   transition: background-color 0.3s ease-in-out;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

const ActionButtons = styled.div`
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin-bottom: 15px;
`;

const SuccessMessage = styled.p`
  color: #28a745;
  margin-bottom: 15px;
`;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { resetPassword, error } = useAuth();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Call the reset password function
    const success = await resetPassword(token, password, confirmPassword);

    if (success) {
      setIsSuccess(true);
      setMessage("Password reset successful! Redirecting to login...");
      // Clear inputs
      setPassword("");
      setConfirmPassword("");

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setIsSuccess(false);
      setMessage(error || "An error occurred. Please try again.");
    }
  };

  return (
    <PageContainer>
      <SiteName>Task Manager</SiteName>
      <ResetPasswordForm onSubmit={handleSubmit}>
        <Title>Reset Password</Title>
        <Description>Enter your new password.</Description>

        {message &&
          (isSuccess ? (
            <SuccessMessage>{message}</SuccessMessage>
          ) : (
            <ErrorMessage>{message}</ErrorMessage>
          ))}

        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength="8"
        />
        <ActionButtons>
          <AuthenticateBtn type="submit">Reset Password</AuthenticateBtn>

          <StyledLink to="/login">Back To Login</StyledLink>
        </ActionButtons>
      </ResetPasswordForm>
    </PageContainer>
  );
};

export default ResetPassword;
