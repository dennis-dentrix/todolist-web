import { styled } from "styled-components";

import { Button } from "@mui/material";

// Shared styles for buttons
const buttonStyles = `
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: white;

  &:hover {
    // Hover effect to be defined in specific button styles
  }
`;

export const EditTaskFormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ActionButtons = styled.div`
  padding-top: 1.3rem;
  display: flex;
  justify-content: space-between;
`;

export const UpdateButton = styled(Button)`
  ${buttonStyles}
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
`;

export const DeleteButton = styled.button`
  ${buttonStyles}
  background-color: #e57373;

  &:hover {
    background-color: #c62828; /* Darker red on hover */
  }
`;
