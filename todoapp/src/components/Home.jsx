/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "@emotion/styled";
import TaskList from "./TaskList";
import { useTasks } from "../context/TaskContext"; // Import the useTasks hook
import Loader from "./Loader";
import EditTaskForm from "./EditTaskForm";
import { breakpoints } from "../styles/constants";

const HomeContainer = styled.div`
  padding: 1.2rem 1rem;

  @media (min-width: ${breakpoints.medium}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.small}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 0 auto;
  }
`;

const TaskSection = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Home = ({ searchTerm }) => {
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [editFormData, setEditFormData] = useState(null); // Make sure this can handle null
  const { tasks, deleteTask, loading } = useTasks();

  const handleEditTask = (task) => {
    setEditFormData(task); // Set the data for the edit form
    setShowEditTaskForm(true); // Show the edit form
  };

  const handleCloseEditForm = () => {
    setShowEditTaskForm(false); // Close the edit form
    setEditFormData(null); // Clear the form data
  };

  // const handleUpdateTask = async (updatedTask) => {
  //   await updateTask(updatedTask);
  //   handleCloseEditForm();
  // };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId); // Use deleteTask from TaskContext
  };

  const filteredTasks = tasks.filter((task) =>
    `${task.title} ${task.description} ${task.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;
  return (
    <HomeContainer>
      <TaskSection>
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </TaskSection>

      {/* Edit Form rendered if task is incomplete and editFormData is not null */}
      {showEditTaskForm && editFormData && (
        <EditTaskForm task={editFormData} onClose={handleCloseEditForm} />
      )}
    </HomeContainer>
  );
};

export default Home;
