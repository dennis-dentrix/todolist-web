/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

import api from "../utils/httpCommon";
import { TaskContext } from "./useTasks";
import { useAuth } from "./useAuth";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isAuthenticated) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get("/list", { withCredentials: true });
        console.log(response);
        setTasks(response.data.data.list);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isAuthenticated]);

  const addTask = async (newTask) => {
    try {
      const response = await api.post("/list", JSON.stringify(newTask), {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
        },
      });

      console.log(response);
      if (response.status === 201) {
        setTasks([...tasks, response.data.data.item]); // Update tasks state
        return response.data.data.item;
      } else {
        setError(`Failed to add task. Status: ${response.status}`);
        throw new Error(`Failed to add task. Status: ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Error adding task";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Extract backend error message
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      console.error("Error adding task:", error);
      throw error; // Re-throw for further handling
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      // console.log("Updating task with ID:", updatedTask._id);
      const response = await api.patch(
        `/list/${updatedTask._id}`,
        updatedTask,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setTasks(
          tasks.map((task) =>
            task._id === updatedTask._id ? response.data.data.item : task
          )
        );
      } else {
        setError(`Failed to update task. Status: ${response.status}`);
        throw new Error(`Failed to update task. Status: ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Error updating task";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Extract error message from backend
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      console.error("Error updating task:", error);
      throw error; // Re-throw for further handling
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/list/${taskId}`, { withCredentials: true });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Error deleting task"
      );
    }
  };

  const value = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
