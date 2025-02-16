/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import NavbarComp from "./NavbarComp";

function AppLayout({
  searchTerm,
  setSearchTerm,
  setShowNewTaskForm,
  children,
}) {
  return (
    <>
      <NavbarComp
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowNewTaskForm={setShowNewTaskForm}
      />
      {children}
      <Outlet />
    </>
  );
}

export default AppLayout;
