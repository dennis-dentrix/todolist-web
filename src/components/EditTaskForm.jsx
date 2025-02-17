/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useTasks } from "../context/useTasks";
import {
  ActionButtons,
  DeleteButton,
  EditTaskFormStyled,
  UpdateButton,
} from "../styles/EditFormComponents";
import { CloseButton, TaskFormContainer } from "../styles/Styles";

const EditTaskForm = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTasks(); // Use TaskContext
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(() => {
    if (task.dueDate) {
      const date = new Date(task.dueDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  });
  const [progress, setProgress] = useState(task.status);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Snackbar handling function
  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      handleSnackbar("Task deleted!");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete task.");
      console.error("Error deleting task:", err);
      handleSnackbar(err.message || "Failed to delete task.");
    } finally {
      handleConfirmClose();
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
      await updateTask(updatedTask);
      handleSnackbar(`Task "${title}" updated!`);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update task.");
      console.error("Error updating task:", err);
      handleSnackbar(err.message || "Failed to update task.");
    }
  };

  return (
    <TaskFormContainer>
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
          <DeleteButton onClick={handleConfirmOpen} variant="contained">
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
    </TaskFormContainer>
  );
};

export default EditTaskForm;
