/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "@emotion/styled";
import { TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NewTaskContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px; /* Adjust width as needed */
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  overflow-y: auto; /* Enable scrolling if content overflows */
  border-left: 1px solid #ddd;
`;

const NewTaskForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  outline: none; /* Remove default outline */
`;

const ButtonStyled = styled(Button)`
  margin-top: 1rem;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  /* font-size: 1em; */
  && {
    /* Applying styles to the MUI Button */

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const NewTask = ({ onClose, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new task object
    const newTask = {
      title,
      category,
      description,
      dueDate,
      progress: "Incomplete", // Default progress
    };

    // Call the onAddTask function passed from the parent component
    onAddTask(newTask);

    // Clear the form fields after submission
    setTitle("");
    setCategory("");
    setDescription("");
    setDueDate("");

    onClose(); // Close the form after submission
  };

  return (
    <NewTaskContainer>
      <CloseButton onClick={onClose} />
      <h2>Add New Task</h2>
      <NewTaskForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          type="date"
          label="Due Date"
          InputLabelProps={{
            shrink: true,
          }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <ButtonStyled type="submit" variant="contained">
          Add Task
        </ButtonStyled>
      </NewTaskForm>
    </NewTaskContainer>
  );
};

export default NewTask;
