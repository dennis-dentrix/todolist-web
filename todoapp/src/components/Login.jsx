import { useState } from "react";
import styled from "styled-components";

const LoginForm = styled.form`
  margin: 20px auto;
  padding: 20px;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here (e.g., API call)
    console.log("Login submitted", { email, password });
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <Button type="submit">Login</Button>
    </LoginForm>
  );
};

export default Login;
