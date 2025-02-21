import { useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { AuthenticateBtn, StyledLink } from "../styles/Styles";
import { useAuth } from "../context/useAuth";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  text-align: center;
`;

const VerifyEmailForm = styled.form`
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const ActionButtons = styled.div`
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
`;

const SuccessMessage = styled.p`
  color: #28a745;
`;

const VerifyEmail = () => {
  const { verifyEmail } = useAuth(); // Use verifyEmail function from context
  const { userId } = useParams(); // Get userId from URL parameters

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Call the verifyEmail function with userId and OTP
      const success = await verifyEmail(userId, otp);
      if (success) {
        setIsSuccess(true);
        setMessage("Email verified successfully! You can now log in.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(error || "Email verification failed.");
    }
  };

  return (
    <PageContainer>
      <SiteName>Task Manager</SiteName>
      <VerifyEmailForm onSubmit={handleSubmit}>
        <Title>Verify Email</Title>

        {message &&
          (isSuccess ? (
            <SuccessMessage>{message}</SuccessMessage>
          ) : (
            <ErrorMessage>{message}</ErrorMessage>
          ))}

        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <ActionButtons>
          <AuthenticateBtn type="submit">Verify OTP</AuthenticateBtn>
          <StyledLink to="/login">Back To Login</StyledLink>
        </ActionButtons>
      </VerifyEmailForm>
    </PageContainer>
  );
};

export default VerifyEmail;
