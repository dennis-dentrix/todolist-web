import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./components/Home";
import User from "./components/User";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewTask from "./components/NewTask";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; //Import searchIcon

const AppContainer = styled.div`
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 0; /* Reduced padding */
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 150px;
  background-color: #f0f0f0;
  padding: 10px; /* Reduced padding */
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
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

  &:hover {
    background-color: #ddd;
  }
`;

// Navbar Styles
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
  width: 30%; /* Adjust width as needed */
  &:focus-within {
    /* Use focus-within */
    border: 1px solid #ccc;
    outline: none; /* Remove default outline */
    box-shadow: none; /* Remove default box-shadow */
  }
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 10px 35px 10px 10px;
  border: none;
  border-radius: 4px;
  outline: none; /* Remove default outline */
  &:focus {
    outline: none; /* Remove default outline */
    box-shadow: none; /* Remove default box-shadow */
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
    /* Applying styles to the MUI Button */
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

const App = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false); // State for NewTask form visibility
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
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

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setShowNewTaskForm(false); // Close the form after submission
  };

  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Sidebar>
          <NavList>
            <NavItem>
              <StyledLink to="/">Home</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/user">User</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/login">Login</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/signup">Signup</StyledLink>
            </NavItem>
          </NavList>
        </Sidebar>
        <Content>
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
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tasks={tasks}
                  setTasks={setTasks}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
