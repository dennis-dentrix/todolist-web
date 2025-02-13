/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import styled from "@emotion/styled";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./components/Home";
import User from "./user/User";
import Login from "./user/Login";
import Signup from "./user/Signup";
import NewTask from "./components/NewTask";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditNoteIcon from "@mui/icons-material/EditNote"; // Pen Icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; //Profile Picture Icon
import ForgotPassword from "./user/Forgotpassword";
import ResetPassword from "./user/ResetPassword";

const AppContainer = styled.div`
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 0;
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 150px;
  background-color: #f0f0f0;
  padding: 10px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Distribute space */
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0; /* remove default */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const NavItem = styled.li`
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  display: block;
  padding: 8px 12px;
  border-radius: 5px;
  text-align: center; /* Center the icons */

  &:hover {
    background-color: #ddd;
  }
`;

const Navbar = styled.div`
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const SearchContainer = styled.div`
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

const SearchBox = styled.input`
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

const SearchIconWrapper = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #777;
`;

const ButtonStyled = styled(Button)`
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

const ProfileIconLink = styled(Link)`
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

const App = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React",
      category: "Development",
      description: "Go through the React tutorial",
      progress: "Incomplete",
    },
    {
      id: 2,
      title: "Grocery Shopping",
      category: "Personal",
      description: "Buy groceries for the week",
      progress: "Complete",
    },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Get login status from local storage on initial load
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    // Set login status in local storage whenever it changes
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setShowNewTaskForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  const AuthRoute = ({ children }) => {
    return !isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        {isLoggedIn && (
          <Sidebar>
            <NavList>
              <NavItem>
                <StyledLink to="/" onClick={() => setShowNewTaskForm(true)}>
                  {" "}
                  {/* Open form */}
                  <EditNoteIcon /> {/* Pen Icon */}
                </StyledLink>
              </NavItem>
            </NavList>
            <ProfileIconLink to="/user">
              <AccountCircleIcon />
            </ProfileIconLink>
          </Sidebar>
        )}
        <Content>
          {isLoggedIn && (
            <Navbar>
              <Title>Task Manager</Title>
              <SearchContainer>
                <SearchBox
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIconWrapper />
              </SearchContainer>
              <ButtonStyled
                variant="contained"
                onClick={() => setShowNewTaskForm(true)}
              >
                Add Task
              </ButtonStyled>
            </Navbar>
          )}
          <Routes>
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login setIsLoggedIn={setIsLoggedIn} />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <Signup setIsLoggedIn={setIsLoggedIn} />
                </AuthRoute>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <AuthRoute>
                  <ForgotPassword />
                </AuthRoute>
              }
            />
            <Route
              path="/resetpassword"
              element={
                <AuthRoute>
                  <ResetPassword />
                </AuthRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home
                    tasks={tasks}
                    setTasks={setTasks}
                    searchTerm={searchTerm}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User handleLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Content>
        {showNewTaskForm && (
          <NewTask
            onClose={() => setShowNewTaskForm(false)}
            onAddTask={handleAddTask}
          />
        )}
      </AppContainer>
    </Router>
  );
};

export default App;
