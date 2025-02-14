import styled from "@emotion/styled";
import { Link } from "react-router";
import SearchIcon from "@mui/icons-material/Search";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  text-align: center; /* Center content horizontally */
`;

export const SiteName = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
`;

export const LoginForm = styled.form`
  margin: 20px auto;
  padding: 30px;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  font-size: 1em;

  &::placeholder {
    color: #aaa; /* Light color for placeholder text */
    opacity: 1; /* Ensure placeholder is visible */
  }

  &:focus {
    border-color: #007bff; /* Highlight border on focus */
    box-shadow: none; /* Remove default shadow */
    outline: none; /* Remove default outline */
  }
`;

export const ActionBtns = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
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

export const StyledLink = styled(Link)`
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

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const Description = styled.p`
  text-align: center;
  color: #777;
  margin-bottom: 25px;
  font-size: 0.9em;
`;

export const SignupForm = styled.form`
  margin: 20px auto;
  padding: 30px;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const SignupButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #218838;
  }
`;

export const StyledLinklogin = styled(Link)`
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

export const AppContainer = styled.div`
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 0;
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.div`
  width: 150px;
  background-color: #f0f0f0;
  padding: 10px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Distribute space */
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0; /* remove default */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

export const NavItem = styled.li`
  margin-bottom: 10px;
`;

// export const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: #333;
//   font-weight: 500;
//   display: block;
//   padding: 8px 12px;
//   border-radius: 5px;
//   text-align: center; /* Center the icons */

//   &:hover {
//     background-color: #ddd;
//   }
// `;

export const Navbar = styled.div`
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// export const Title = styled.h2`
//   margin: 0;
// `;

export const SearchContainer = styled.div`
  display: flex;
  justify-self: center;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 30%;
  &:focus-within {
    border: 1px solid #ccc;
    outline: none;
    box-shadow: none;
  }
`;

export const SearchBox = styled.input`
  width: 100%;
  padding: 10px 35px 10px 10px;
  border: none;
  border-radius: 4px;
  outline: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const SearchIconWrapper = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #777;
`;

export const ButtonStyled = styled(Button)`
  && {
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
  }
`;

export const ProfileIconLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;
  padding: 8px 12px;
  border-radius: 50%; /* Make it circular */
  text-align: center;
  &:hover {
    background-color: #ddd;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 8px;
`;

export const ForgotPasswordLink = styled(Link)`
  text-decoration: none;
  color: #007bff; /* Standard blue link color */
  font-size: 0.9em;
  margin-bottom: 15px; /* Match spacing of input fields */
  display: block; /* Ensure it takes up full width and sits on its own line */
  text-align: right; /* Align to the right */

  &:hover {
    text-decoration: underline;
    color: #0056b3; /* Darker blue on hover */
  }
`;
