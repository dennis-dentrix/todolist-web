import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,

  //   useNavigate, //Removed: Not used here, move to component
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Login from "./user/Login";
import Signup from "./user/Signup";
import NewTask from "./components/NewTask";
import ForgotPassword from "./user/Forgotpassword";
import ResetPassword from "./user/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import AppLayout from "./components/Applayout";
import { AppContainer, Content } from "./styles/Styles";
import User from "./user/User";
import Home from "./components/Home";
import { TaskProvider } from "./context/TaskContext";
import ResetPasswordPage from "./user/ResetPasswordPage";

const App = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [tasks, setTasks] = useState(initialTasks);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Get login status from local storage on initial load
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    // Set login status in local storage whenever it changes
    localStorage.setItem("isLoggedIn", String(isLoggedIn)); // Ensure boolean is stored as a string
  }, [isLoggedIn]);

  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <GlobalStyles />
          <AppContainer>
            {/* {isLoggedIn && ( 
          )} */}
            {/* <ProtectedRoute>
            <SidebarComp setShowNewTaskForm={setShowNewTaskForm} />
          </ProtectedRoute> */}
            <Content>
              {/* <NavbarComp />  Removed: Not present in code*/}

              <Routes>
                <Route
                  path="/login"
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                  path="/signup"
                  element={<Signup setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route
                  path="/resetpassword/:token"
                  element={<ResetPasswordPage />}
                />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <AppLayout
                        // tasks={tasks}
                        // setTasks={setTasks}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setShowNewTaskForm={setShowNewTaskForm}
                      />
                    </ProtectedRoute>
                  }
                >
                  {/* Nested Routes */}
                  <Route
                    index
                    element={
                      <Home
                        // tasks={tasks}
                        // setTasks={setTasks}
                        searchTerm={searchTerm}
                      />
                    }
                  />
                  <Route path="user" element={<User />} />
                </Route>
              </Routes>
            </Content>
            {showNewTaskForm && (
              <NewTask
                onClose={() => setShowNewTaskForm(false)}
                // onAddTask={handleAddTask}
              />
            )}
          </AppContainer>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
};

export const apiUrl = "https://todo-backend-nks4.onrender.com/api/v1";

export default App;
