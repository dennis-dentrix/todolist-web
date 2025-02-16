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
  StyledLink,
  Button,
  ForgotPasswordLink,
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

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    loginUser,
    snackbarOpen,
    snackbarMessage,
    closeSnackbar,
    isAuthenticated,
    error,
    loading,
  } = useAuth();

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, exit the function
    }

    await loginUser(email, password); // Call login function
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
        {/* Display API error */}
        <ForgotPasswordLink to={"/forgotpassword"}>
          Forgot Password?
        </ForgotPasswordLink>
        <ActionBtns>
          <Button type="submit">Login</Button>
          <p>or</p>
          <StyledLink to="/signup">Signup</StyledLink>
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
