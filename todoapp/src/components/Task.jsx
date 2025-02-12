/* eslint-disable react/prop-types */
import React from "react";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  width: 280px;
  transition: all 0.3s ease;
  position: relative; /* Needed for positioning the delete button */

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TaskTitle = styled.h3`
  margin-top: 0;
  color: #333;
  font-size: 1.1em;
  font-weight: 600;
`;

const TaskCategory = styled.span`
  font-size: 0.8em;
  color: #777;
  margin-left: 10px;
  font-style: italic;
`;

const TaskDescription = styled.p`
  color: #555;
  margin-top: 5px;
  font-size: 0.9em;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Prevent wrapping */
`;

const TaskDueDate = styled.div`
  margin-top: 5px;
  font-size: 0.8em;
  color: #777;
`;

const TaskProgress = styled.div`
  margin-top: 15px;
  font-style: italic;
  color: #888;
  font-size: 0.85em;
`;

const DeleteButton = styled(DeleteIcon)`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  color: #e57373;

  &:hover {
    /* Red on hover */
  }
`;

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <TaskContainer
      onClick={() => (task.progress === "Incomplete" ? onEdit(task) : {})}
    >
      <TaskTitle>
        {task.title} <TaskCategory>{task.category}</TaskCategory>
      </TaskTitle>
      <TaskDescription>{task.description}</TaskDescription>
      <TaskDueDate>Due Date: {task.dueDate}</TaskDueDate>
      <TaskProgress>Progress: {task.progress}</TaskProgress>
      {task.progress === "Complete" && (
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onDelete(task.id);
          }}
        />
      )}
    </TaskContainer>
  );
};

export default Task;
