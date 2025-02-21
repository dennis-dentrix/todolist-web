import { useState } from "react";
import {
  AuthenticateBtn,
  Title,
  Description,
  SiteName,
  Input,
  PageContainer,
  SignupForm,
  ActionBtns,
  StyledLinkAlt,
  ErrorMessage,
  Button,
} from "../styles/Styles";
import { useAuth } from "../context/useAuth";
import Loader from "../components/Loader";
import CustomSnackbar from "../components/CustomSnackBar";

const Signup = () => {
  const {
    signup,
    loading,
    error: apiError, // Renamed for clarity
    snackbarMessage,
    snackbarOpen,
    closeSnackbar,
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [formError, setFormError] = useState(""); // Consolidated error state

  const validateForm = () => {
    if (!email) {
      setFormError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Email is invalid");
      return false;
    }

    if (!password) {
      setFormError("Password is required");
      return false;
    } else if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return false;
    } else if (password !== passwordConfirm) {
      setFormError("Passwords do not match!");
      return false;
    }

    setFormError(""); // Clear error if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Exit if validation fails

    // Reset API error before attempting to sign up
    await signup(name, email, password, passwordConfirm);

    // Check for errors after signup attempt
    if (apiError) {
      setFormError(apiError); // Set API error message
    }
  };

  if (loading) return <Loader />;

  return (
    <PageContainer>
      <SiteName>Task Manager</SiteName>
      <SignupForm onSubmit={handleSubmit}>
        <Title>Create Account</Title>
        <Description>Sign up to start managing your tasks today!</Description>

        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setFormError(""); // Reset error on input change
          }}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFormError(""); // Reset error on input change
          }}
          required
        />

        {/* Display form error message */}
        {formError && <ErrorMessage>{formError}</ErrorMessage>}

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFormError(""); // Reset error on input change
          }}
          required
        />

        <Input
          type="password"
          placeholder="Confirm your password"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            setFormError(""); // Reset error on input change
          }}
          required
        />

        {/* Display API error message */}
        {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

        <ActionBtns>
          <AuthenticateBtn type="submit">Sign Up</AuthenticateBtn>
          <p>or</p>
          <Button>
            <StyledLinkAlt to="/login">Login</StyledLinkAlt>
          </Button>
        </ActionBtns>
      </SignupForm>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={closeSnackbar}
      />
    </PageContainer>
  );
};

export default Signup;
