/* eslint-disable react/prop-types */
import { styled } from "styled-components";
import { breakpoints, colors } from "../styles/constants";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskContainer = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  width: 280px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${breakpoints.medium}) {
    width: 280px;
  }
`;

const TaskTitle = styled.h3`
  margin-top: 0;
  color: ${colors.text};
  font-size: 1.1em;
  font-weight: 600;
`;

const TaskCategory = styled.span`
  font-size: 0.8em;
  color: ${colors.textSecondary};
  margin-left: 10px;
  font-style: italic;
`;

const TaskDescription = styled.p`
  color: ${colors.textSecondary};
  margin-top: 5px;
  font-size: 0.9em;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: ${breakpoints.medium}) {
    flex-direction: row;
  }
`;

const TaskDueDate = styled.p`
  margin-top: 5px;
  font-size: 0.8em;
  color: ${colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TaskProgress = styled.p`
  margin-top: 15px;
  font-style: italic;
  color: ${colors.textSecondary};
  font-size: 0.85em;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const DeleteIconBtn = styled(DeleteIcon)`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  color: #e57373;

  &:hover {
    color: #c62828;
  }
`;

const Task = ({ task, onDelete, onEdit }) => {
  const displayDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No Due Date";

  return (
    <TaskContainer
      onClick={() => {
        if (task.status === "incomplete") {
          onEdit(task);
        }
      }}
    >
      <TaskTitle>
        {task.title} <TaskCategory>{task.category}</TaskCategory>
      </TaskTitle>
      <TaskDescription>{task.description}</TaskDescription>

      <TaskInfo>
        <TaskDueDate>
          Due Date:
          <span>{displayDate}</span>
        </TaskDueDate>
        <TaskProgress>
          Progress: <span>{task.status}</span>
        </TaskProgress>
      </TaskInfo>

      {task.status === "completed" && (
        <DeleteIconBtn
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onDelete(task._id);
          }}
        />
      )}
    </TaskContainer>
  );
};

export default Task;
