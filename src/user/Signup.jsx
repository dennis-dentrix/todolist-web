import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// const PasswordContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   border-bottom: 1px solid #ddd;

//   margin-bottom: 15px;
//   width: 100%;
// `;

// const PassInput = styled.input`
//   border: none;
//   outline: none;
//   width: 100%;
//   padding: 10px;
//   font-size: 1em;
// `;

// const PasswordToggleIcon = styled.span`
//   position: absolute;
//   right: 10px;
//   cursor: pointer;
// `;

const Signup = () => {
  const navigate = useNavigate();
  const {
    signup,
    isAuthenticated,
    loading,
    error,
    snackbarMessage,
    snackbarOpen,
    closeSnackbar,
  } = useAuth(); // Get error state from context

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Additional state for API error
  const [apiError, setApiError] = useState("");

  // State for showing/hiding passwords
  // const [showPassword, setShowPassword] = useState(false);

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
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else if (password !== passwordConfirm) {
      setPasswordError("Passwords do not match!");
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

    // Reset API error before attempting to sign up
    setApiError("");

    await signup(name, email, password, passwordConfirm);

    // Check for errors after signup attempt
    if (error) {
      setApiError(error); // Set API error message
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

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
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <Input
          type="password" // Toggle input type based on state
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        <Input
          type="password"
          placeholder="Confirm your password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
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
