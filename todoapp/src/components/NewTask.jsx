/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextField } from "@mui/material";
import { useTasks } from "../context/TaskContext"; // Import the useTasks hook
import {
  ButtonStyled,
  CloseButton,
  ErrorMessage,
  TaskForm,
  TaskFormContainer,
} from "../styles/Styles";

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
    <TaskFormContainer>
      <CloseButton onClick={onClose} />
      <h2>Add New Task</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <TaskForm onSubmit={handleSubmit}>
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
      </TaskForm>
    </TaskFormContainer>
  );
};

export default NewTask;
