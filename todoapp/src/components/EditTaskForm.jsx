/* eslint-disable react/prop-types */

import { useState } from "react";
import styled from "@emotion/styled";
import { TextField, Button, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const EditTaskContainer = styled.div`
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

const EditTaskFormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   font-size: 1em;
//   outline: none;
// `;

const ActionButtons = styled.div`
  padding-top: 1.3rem;
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.button`
  /* Applying styles to the MUI Button */
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  && {
    &:hover {
      /* background-color: #0056b3; */
    }
  }
`;

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 40px;
`;

const DeleteButton = styled(Button)`
  background-color: #e57373;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  && {
    /* Applying styles to the MUI Button */

    /* font-size: 1em; */

    &:hover {
      /* background-color: #0056b3; */
    }
  }
`;

const EditTaskForm = ({ task, onUpdate, onClose, onDelete }) => {
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [progress, setProgress] = useState(task.progress);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDelete = (taskId) => {
    onDelete(taskId);
    setSnackbarMessage("Task deleted!");
    setSnackbarOpen(true);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Updated task object with form data
    const updatedTask = {
      ...task,
      title,
      category,
      description,
      dueDate,
      progress,
    };
    onUpdate(updatedTask);
    setSnackbarMessage(`Task "${title}" updated!`);
    setSnackbarOpen(true);
    onClose();
  };

  return (
    <EditTaskContainer>
      <CloseButton onClick={onClose} />
      <h2>Edit Task</h2>
      <EditTaskFormStyled onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Progress"
          select
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          margin="normal"
          fullWidth
          SelectProps={{
            native: true,
          }}
        >
          <option value="Incomplete">Incomplete</option>
          <option value="Complete">Complete</option>
        </TextField>
        <ActionButtons>
          <AddButton type="submit" variant="contained">
            <EditNoteIcon />
            Update Task
          </AddButton>
          <DeleteButton
            onClick={() => handleDelete(task.id, "item deleted")}
            variant="contained"
          >
            <DeleteIcon />
            Delete
          </DeleteButton>
        </ActionButtons>
      </EditTaskFormStyled>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </EditTaskContainer>
  );
};

export default EditTaskForm;
