/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "@emotion/styled";
import { TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTasks } from "../context/TaskContext"; // Import the useTasks hook

const NewTaskContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
  border-left: 1px solid #ddd;
`;

const NewTaskForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonStyled = styled(Button)`
  margin-top: 1rem;
`;

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const NewTask = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTask } = useTasks();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!title || !category || !description || !dueDate) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const newTask = {
        title,
        category,
        description,
        dueDate,
      };

      await addTask(newTask);

      // Reset form fields
      setTitle("");
      setCategory("");
      setDescription("");
      setDueDate("");
      setError(""); // Clear error message
      onClose(); // Close the form
    } catch (err) {
      setError(err.message || "Failed to add task.");
      console.error("Error adding task:", err);
    }
  };

  return (
    <NewTaskContainer>
      <CloseButton onClick={onClose} />
      <h2>Add New Task</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <NewTaskForm onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <ButtonStyled type="submit" variant="contained" color="primary">
          Add Task
        </ButtonStyled>
      </NewTaskForm>
    </NewTaskContainer>
  );
};

export default NewTask;
