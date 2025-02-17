import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";
import Login from "./user/Login";
import Signup from "./user/Signup";
import NewTask from "./components/NewTask";

import ForgotPassword from "./user/Forgotpassword";
import ResetPassword from "./user/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AppContainer, Content } from "./styles/Styles";
import User from "./user/User";
import Home from "./components/Home";
import { TaskProvider } from "./context/TaskContext";
import NotFound from "./components/Notfound";
import EditTaskForm from "./components/EditTaskForm";
import AppLayout from "./components/Applayout";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const App = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false); // State for Edit Task form
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <GlobalStyles />
          <AppContainer>
            {/* Backdrop to cover the screen when forms are open */}
            {(showNewTaskForm || showEditTaskForm) && (
              <Backdrop
                onClick={() => {
                  setShowNewTaskForm(false);
                  setShowEditTaskForm(false);
                }}
              />
            )}
            <Content>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="/resetpassword/:token"
                  element={<ResetPassword />}
                />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <AppLayout
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setShowNewTaskForm={setShowNewTaskForm}
                        setShowEditTaskForm={setShowEditTaskForm} // Pass down the function to open Edit Task form
                      />
                    </ProtectedRoute>
                  }
                >
                  {/* Nested Routes */}
                  <Route index element={<Home searchTerm={searchTerm} />} />
                  <Route path="user" element={<User />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Content>

            {/* Render New Task Form */}
            {showNewTaskForm && (
              <NewTask onClose={() => setShowNewTaskForm(false)} />
            )}

            {showEditTaskForm && (
              <EditTaskForm onClose={() => setShowEditTaskForm(false)} /> // Ensure onClose prop is passed
            )}
          </AppContainer>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
};

export const apiUrl = "https://todo-backend-nks4.onrender.com/api/v1";

export default App;
