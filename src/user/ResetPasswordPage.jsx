import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path as necessary
import styled from "styled-components"; // Import styled-components
import { PageContainer } from "../styles/Styles";

const ResetPasswordForm = styled.form`
  margin: 20px auto;
  padding: 30px;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// const SiteName = styled.h1`
//   color: #333;
//   margin-bottom: 20px;
//   font-size: 2em;
// `;

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
  padding: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get the token from the URL parameters
  const { resetPassword, error } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(token, password, passwordConfirm);

    // If reset is successful and no error is set, navigate to login or home
    if (!error) {
      navigate("/login"); // Redirect to login page after successful reset
    }
  };

  return (
    <PageContainer>
      <Title>Task Manager</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ResetPasswordForm onSubmit={handleSubmit}>
        <Title>Reset Password</Title>
        <Description>Enter your new password.</Description>
        {/* {message && <p>{message}</p>} */}
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
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
        <Button type="submit">Reset Password</Button>
      </ResetPasswordForm>
    </PageContainer>
  );
};

export default ResetPasswordPage;
