/* eslint-disable react/prop-types */
import {
  NavItem,
  NavList,
  ProfileIconLink,
  Sidebar,
  StyledLink,
} from "../styles/Styles";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function SidebarComp({ setShowNewTaskForm }) {
  return (
    <Sidebar>
      {/* Navigation List */}
      <NavList>
        <NavItem>
          <StyledLink to="/" onClick={() => setShowNewTaskForm(true)}>
            <EditNoteIcon /> {/* Pen Icon */}
          </StyledLink>
        </NavItem>
      </NavList>

      {/* Profile Icon Link */}
      <ProfileIconLink to="/user">
        <AccountCircleIcon />
      </ProfileIconLink>
    </Sidebar>
  );
}
