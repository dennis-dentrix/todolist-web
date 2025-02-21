import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  SiteName,
  LoginForm,
  Title,
  Description,
  Input,
  ActionBtns,
  StyledLinkAlt,
  Button,
  ForgotPasswordLink,
  AuthenticateBtn,
} from "../styles/Styles";
import { useAuth } from "../context/useAuth";
import styled from "styled-components";
import Loader from "../components/Loader";
import CustomSnackbar from "../components/CustomSnackBar";

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); // Single error state

  const {
    loginUser,
    snackbarOpen,
    snackbarMessage,
    closeSnackbar,
    isAuthenticated,
    loading,
  } = useAuth();

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      isValid = false;
    } else if (!password) {
      setError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, exit the function
    }

    // Reset error before attempting to log in
    setError("");

    const success = await loginUser(email, password); // Call login function

    // Check for errors after login attempt
    if (!success) {
      setError("Login failed. Please check your credentials."); // Set a generic error message
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  if (loading) return <Loader />;

  return (
    <PageContainer>
      <SiteName>Task Manager</SiteName>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Welcome Back!</Title>
        <Description>Login to manage your tasks.</Description>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // Reset error on input change
          }}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // Reset error on input change
          }}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
        {/* Display API error */}
        <ForgotPasswordLink to={"/forgotpassword"}>
          Forgot Password?
        </ForgotPasswordLink>
        <ActionBtns>
          <AuthenticateBtn type="submit">Login</AuthenticateBtn>
          <p>or</p>
          <Button secondary>
            <StyledLinkAlt to="/signup">Signup</StyledLinkAlt>
          </Button>
        </ActionBtns>
      </LoginForm>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={closeSnackbar}
      />
    </PageContainer>
  );
};

export default Login;
