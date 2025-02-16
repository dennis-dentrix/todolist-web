import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
// import ResetPasswordPage from "./user/ResetPasswordPage";
import NotFound from "./components/Notfound";

const App = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <GlobalStyles />
          <AppContainer>
            <Content>
              {/* <NavbarComp />  Removed: Not present in code*/}

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                {/* <Route path="/resetpassword" element={<ResetPassword />} /> */}
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
                  <Route path="*" element={<NotFound />} />
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
