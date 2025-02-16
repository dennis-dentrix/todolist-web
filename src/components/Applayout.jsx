/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import NavbarComp from "./NavbarComp";

function AppLayout({
  searchTerm,
  setSearchTerm,
  setShowNewTaskForm,
  children, // Added children prop
  // tasks,
  // setTasks,
}) {
  if (!children) {
    console.warn("No children passed to AppLayout!");
    return null; // Or some fallback UI
  }

  return (
    <>
      <NavbarComp
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowNewTaskForm={setShowNewTaskForm}
      />
      <Outlet /> {/* Render nested routes */}
      {children}
    </>
  );
}

//Optional: setting children to null using defaultProps
AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
