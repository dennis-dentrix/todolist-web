/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Task from "./Task";
import { TaskListContainer, NoTasksMessage } from "../styles/Styles";

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
