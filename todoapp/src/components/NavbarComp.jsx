/* eslint-disable react/prop-types */
import {
  ButtonStyled,
  Navbar,
  SearchBox,
  SearchContainer,
  SearchIconWrapper,
  Title,
} from "../styles/Styles";

export default function NavbarComp({
  searchTerm,
  setSearchTerm,
  setShowNewTaskForm,
}) {
  return (
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
  );
}
