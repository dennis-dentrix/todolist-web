/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "@emotion/styled";
import {
  TextField,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useTasks } from "../context/TaskContext"; // Import the useTasks hook

const EditTaskContainer = styled.div`
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

const EditTaskFormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

const ActionButtons = styled.div`
  padding-top: 1.3rem;
  display: flex;
  justify-content: space-between;
`;

const UpdateButton = styled(Button)`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  &:hover {
    background-color: #0056b3;
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

  &:hover {
    background-color: #c62828; /* Darker red on hover */
  }
`;

const EditTaskForm = ({ task, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(() => {
    // Function to format the date to YYYY-MM-DD
    if (task.dueDate) {
      const date = new Date(task.dueDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return ""; // Return empty string if no dueDate
  });
  const [progress, setProgress] = useState(task.status);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false); // State for confirmation dialog

  const { updateTask, deleteTask } = useTasks(); // Use TaskContext

  // Centralized snackbar handling
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Confirmation dialog handlers
  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id); // Use deleteTask from TaskContext
      showSnackbar("Task deleted!");
      onClose(); // Close the form
    } catch (err) {
      setError(err.message || "Failed to delete task.");
      console.error("Error deleting task:", err);
    } finally {
      handleConfirmClose(); // Close confirmation dialog
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        ...task,
        title,
        category,
        description,
        dueDate,
        status: progress,
      };
      await updateTask(updatedTask); // Use updateTask from TaskContext
      showSnackbar(`Task "${title}" updated!`);
      onClose(); // Close the form
    } catch (err) {
      setError(err.message || "Failed to update task.");
      console.error("Error updating task:", err);
    }
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
          <option value="pending">Incomplete</option>
          <option value="completed">Completed</option>
        </TextField>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ActionButtons>
          <UpdateButton type="submit" variant="contained">
            <EditNoteIcon />
            Update Task
          </UpdateButton>
          <DeleteButton
            onClick={handleConfirmOpen} // Open confirmation dialog
            variant="contained"
          >
            <DeleteIcon />
            Delete
          </DeleteButton>
        </ActionButtons>
      </EditTaskFormStyled>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
