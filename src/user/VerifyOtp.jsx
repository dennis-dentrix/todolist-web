import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../utils/httpCommon"; // Adjust the import based on your project structure
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

const VerifyOTPForm = styled.form`
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

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/verifyResetOTP", { otp });
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage("OTP is valid! You can now reset your password.");

        // Navigate to the Reset Password page with userId or any necessary info
        navigate(`/resetPassword/${response.data.userId}`); // Adjust based on your response structure
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <PageContainer>
      <SiteName>Task Manager</SiteName>
      <VerifyOTPForm onSubmit={handleSubmit}>
        <Title>Verify OTP</Title>

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
      </VerifyOTPForm>
    </PageContainer>
  );
};

export default VerifyOTP;
