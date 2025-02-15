import styled from "@emotion/styled";
import { Link } from "react-router-dom"; // Corrected import
import CloseIcon from "@mui/icons-material/Close";
import { breakpoints, colors } from "./constants";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${colors.background};
  text-align: center;
  /* padding: 2rem 3rem; */

  @media (max-width: ${breakpoints.medium}) {
    padding: 10px;
  }
`;

export const SiteName = styled.h1`
  color: ${colors.text};
  margin-bottom: 20px;
  font-size: 2.5em;
  font-family: "Roboto", sans-serif;

  @media (max-width: ${breakpoints.medium}) {
    font-size: 2em;
  }
`;

export const LoginForm = styled.form`
  margin: 20px auto;
  padding: 30px;
  max-width: 400px;
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.small}) {
    padding: 20px;
    max-width: 90%;
  }
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.border};
  font-size: 1em;

  &::placeholder {
    color: ${colors.textSecondary};
    opacity: 1;
  }

  &:focus {
    border-color: ${colors.primary};
    box-shadow: none;
    outline: none;
  }
`;

export const ActionBtns = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;

  @media (max-width: ${breakpoints.small}) {
    flex-direction: column;
    align-items: center;
    gap: 10px; /* Add gap between buttons on small screens */
  }
`;

export const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.hover};
  }
`;

export const ButtonStyled = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
  width: max-content;

  &:hover {
    background-color: ${colors.hover};
  }

  @media (max-width: ${breakpoints.small}) {
    width: 100%;
  }
`;

export const StyledLink = styled(Link)`
  background-color: ${colors.secondary};
  text-decoration: none;
  color: ${colors.white};
  font-weight: 500;
  display: block;
  padding: 12px 20px;
  border-radius: 6px;
  text-align: center;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.hoverSecondary};
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${colors.text};
  font-family: "Roboto", sans-serif;
`;

export const Description = styled.p`
  text-align: center;
  color: ${colors.textSecondary};
  margin-bottom: 25px;
  font-size: 0.9em;
`;

export const SignupForm = styled.form`
  margin: 20px auto;
  padding: 30px;
  max-width: 400px;
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.small}) {
    padding: 20px;
    max-width: 90%;
  }
`;

export const SignupButton = styled.button`
  background-color: #28a745;
  color: ${colors.white};
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export const StyledLinklogin = styled(Link)`
  background-color: ${colors.secondary};
  text-decoration: none;
  color: ${colors.white};
  font-weight: 500;
  display: block;
  padding: 12px 20px;
  border-radius: 6px;
  text-align: center;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.hoverSecondary};
  }
`;

export const AppContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  z-index: 1;

  @media (min-width: ${breakpoints.medium}) {
    flex-direction: column; /* Keep column layout for larger screens */
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 1.2rem 1rem;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;

  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const NavItem = styled.li`
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.medium}) {
    margin-bottom: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 8px;
`;

export const ForgotPasswordLink = styled(Link)`
  text-decoration: none;
  color: ${colors.primary};
  font-size: 0.9em;
  margin-bottom: 15px;
  display: block;
  text-align: right;

  &:hover {
    text-decoration: underline;
    color: ${colors.hover};
  }
`;

export const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const TaskFormContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: ${colors.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
  border-left: 1px solid ${colors.border};

  @media (max-width: ${breakpoints.medium}) {
    width: 100%;
    position: static;
    height: auto;
    box-shadow: none;
    border-left: none;
    z-index: 1000;
  }
`;

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const TaskListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  justify-content: center;

  @media (max-width: ${breakpoints.small}) {
    /* grid-template-columns: 1fr; */
  }
`;

export const NoTasksMessage = styled.p`
  text-align: center;
  color: ${colors.textSecondary};
  font-style: italic;
  padding: 20px;
`;
