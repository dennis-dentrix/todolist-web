/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";
// Import useLocation
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { breakpoints, colors } from "../styles/constants";

// STYLED COMPONENTS
const Navbar = styled.div`
  background-color: ${colors.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: ${breakpoints.medium}) {
    padding: 6px;
    max-width: 768px;
  }
  @media (max-width: ${breakpoints.small}) {
    padding: 1px;
    max-width: 576px;
  }
`;

const Title = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  color: ${colors.text};
  font-family: "Roboto", sans-serif;

  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const TitleMobile = styled(Link)`
  display: none;
  text-decoration: none;
  color: ${colors.text};
  font-family: "Roboto", sans-serif;

  @media (max-width: ${breakpoints.medium}) {
    display: block;
    font-size: 1em;
  }
`;

const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;

  @media (max-width: ${breakpoints.medium}) {
    width: 100%;
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
  color: ${colors.textSecondary};
`;

const SearchContainer = styled.div`
  display: flex;
  position: relative;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  width: 50%;

  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }

  @media (max-width: ${breakpoints.small}) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const SearchContainerMobile = styled.div`
  display: none;
  width: 100%;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.medium}) {
    display: flex;
    position: relative;
    border: 1px solid ${colors.border};
    border-radius: 4px;
  }
`;

const ProfileIconLink = styled(Link)`
  text-decoration: none;
  color: ${colors.text};
  display: block;
  padding: 8px 12px;
  border-radius: 50%;
  text-align: center;

  &:hover {
    background-color: ${colors.border};
  }

  @media (max-width: ${breakpoints.medium}) {
    padding: 0;
    &:hover {
      background-color: transparent;
    }
  }
`;

const ButtonStyled = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 9px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: ${colors.hover};
  }

  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const AddButtonMobile = styled.button`
  background-color: transparent;
  /* padding: 12px 20px; */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  display: none;

  &:hover {
    background-color: transparent;
    outline: none;
  }

  &:focus {
    outline: none;
    background-color: transparent;
  }

  @media (max-width: ${breakpoints.medium}) {
    display: block;
  }
`;

export default function NavbarComp({
  searchTerm,
  setSearchTerm,
  setShowNewTaskForm,
}) {
  const location = useLocation(); // Get the current location

  const shouldShowSearch = location.pathname !== "/user"; // Check if we're NOT on the /user route

  return (
    <Navbar>
      <NavbarContent>
        <Title to={"/"}>Task Manager</Title>
        {shouldShowSearch && ( // Conditionally render the search bar
          <SearchContainer>
            <SearchBox
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIconWrapper />
          </SearchContainer>
        )}
        <TitleMobile to={"/"}>Task Manager</TitleMobile>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
          }}
        >
          <AddButtonMobile onClick={() => setShowNewTaskForm(true)}>
            <EditNoteIcon fontSize="large" />
          </AddButtonMobile>

          <ButtonStyled onClick={() => setShowNewTaskForm(true)}>
            Add Task
          </ButtonStyled>

          <ProfileIconLink to="/user">
            <AccountCircleIcon fontSize="large" />
          </ProfileIconLink>
        </div>{" "}
      </NavbarContent>
      {shouldShowSearch && ( // Conditionally render the mobile search bar
        <SearchContainerMobile>
          <SearchBox
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIconWrapper />
        </SearchContainerMobile>
      )}
    </Navbar>
  );
}
