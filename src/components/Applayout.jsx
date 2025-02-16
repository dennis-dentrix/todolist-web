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
    <>
      <NavbarComp
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowNewTaskForm={setShowNewTaskForm}
      />
      <Outlet /> {/* Render nested routes */}
    </>
  );
}

//Optional: setting children to null using defaultProps
AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
