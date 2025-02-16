import { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Snackbar } from "@mui/material";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  text-align: center;
`;

const ForgotPasswordForm = styled.form`
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

const ActionBtns = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [apiError, setApiError] = useState("");

  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError(""); // Reset any previous errors

    try {
      await forgotPassword(email);
      setSnackbarMessage("Reset link sent to your email!");
      setSnackbarOpen(true);
    } catch (error) {
      setApiError(error); // Set API error message for display
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <PageContainer>
      <SiteName>Task Manager</SiteName>
      <ForgotPasswordForm onSubmit={handleSubmit}>
        <Title>Forgot Password</Title>
        <Description>
          Enter your email address and we will send you a link to reset your
          password.
        </Description>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <ActionBtns>
          <Button type="submit">Reset Password</Button>
          <StyledLink to="/login">Back to Login</StyledLink>
        </ActionBtns>
      </ForgotPasswordForm>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </PageContainer>
  );
};

export default ForgotPassword;
