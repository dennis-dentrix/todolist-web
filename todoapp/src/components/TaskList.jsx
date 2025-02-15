/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import Task from "./Task";

const TaskListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); /* Responsive columns */
  gap: 20px;
  padding: 20px;
  justify-content: center; /* Center items horizontally */
`;

const NoTasksMessage = styled.p`
  text-align: center;
  color: #777;
  font-style: italic;
  padding: 20px;
`;

const TaskList = ({ tasks, onUpdateProgress, onDelete, onEdit }) => {
  // console.log(tasks);
  return (
    <TaskListContainer>
      {tasks.length === 0 ? (
        <NoTasksMessage>No tasks available.</NoTasksMessage>
      ) : (
        tasks.map((task) => (
          <Task
            key={task._id} // Changed from task.id
            task={task}
            onUpdateProgress={onUpdateProgress}
            onDelete={onDelete}
            onEdit={onEdit} // Pass the onEdit function
          />
        ))
      )}
    </TaskListContainer>
  );
};

export default TaskList;
