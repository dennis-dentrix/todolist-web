/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  text-align: center; /* Center content horizontally */
`;

const SiteName = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
`;

const LoginForm = styled.form`
  margin: 20px auto;
  padding: 30px;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  background-color: #6c757d;
  text-decoration: none;
  color: white;
  font-weight: 500;
  display: block;
  padding: 12px 20px;
  border-radius: 6px;
  text-align: center;
  font-size: 1em;

  &:hover {
    background-color: #5a6268;
  }
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

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here (e.g., API call)
    // For this example, we'll just check if the email and password are not empty
    if (email && password) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Please enter email and password");
    }
  };

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
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to={"/forgotPassword"}>Forgot Password</Link>

        <ActionBtns>
          <StyledLink to="/signup">Signup</StyledLink>
          <Button type="submit">Login</Button>
        </ActionBtns>
      </LoginForm>
    </PageContainer>
  );
};

export default Login;
