/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import NavbarComp from "./NavbarComp";

function AppLayout({
  searchTerm,
  setSearchTerm,
  setShowNewTaskForm,
  // tasks,
  // setTasks,
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        boxSizing: "border-box",
        margin: "0 auto",
      }}
    >
      {/* Sidebar */}
      {/* <SidebarComp setShowNewTaskForm={setShowNewTaskForm} /> */}

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        <NavbarComp
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowNewTaskForm={setShowNewTaskForm}
        />

        {/* Render the nested routes (Home or User) */}
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
