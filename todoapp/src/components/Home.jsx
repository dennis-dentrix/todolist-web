/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "@emotion/styled";
import TaskList from "./TaskList";
// import EditTaskForm from "./EditTaskForm";
import EditTaskForm from "./EditTaskForm";

const HomeContainer = styled.div`
  padding: 20px;
`;

const TaskSection = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Home = ({ tasks, setTasks, searchTerm }) => {
  // Receive tasks and setTasks
  // const [searchTerm, setSearchTerm] = useState(""); // No longer needed here
  // const [selectedTask, setSelectedTask] = useState(null);
  //const [showModal, setShowModal] = useState(false); //Unused
  const [showEditTaskForm, setShowEditTaskForm] = useState(false); // Track edit mode
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    // Fetch tasks from API here
  }, []);

  const handleUpdateProgress = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, progress: "Complete" } : task
      )
    );
  };

  const handleDeleteTask = (taskId, text) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast(text);
  };

  const handleEditTask = (task) => {
    if (task.progress === "Incomplete") {
      setEditFormData(task); // Set the data for the edit form
      setShowEditTaskForm(true); // Show the edit form
    }
  };

  const handleCloseEditForm = () => {
    setShowEditTaskForm(false); // Close the edit form
    setEditFormData({}); // Clear the form data
  };

  const handleUpdateTask = (updatedTask) => {
    // Integrate with backend to save edits
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    handleCloseEditForm();
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HomeContainer>
      <TaskSection>
        <TaskList
          tasks={filteredTasks}
          onUpdateProgress={handleUpdateProgress}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </TaskSection>

      {/*Edit Form rendered if task is incomplete*/}
      {showEditTaskForm && (
        <EditTaskForm
          task={editFormData}
          onUpdate={handleUpdateTask}
          onClose={handleCloseEditForm}
          onDelete={handleDeleteTask}
          // ToastContainer
        />
      )}
    </HomeContainer>
  );
};

export default Home;
