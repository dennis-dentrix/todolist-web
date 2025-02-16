// eslint-disable-next-line no-unused-vars
import React from "react";
import styled, { keyframes } from "styled-components";
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* or any height you want */
`;
const LoaderSpinner = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;

const Loader = () => (
  <LoaderContainer>
    <LoaderSpinner />
  </LoaderContainer>
);

export default Loader;
