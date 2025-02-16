import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ensure it takes at least the full viewport height */
  text-align: center;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4;
`;

const ErrorCode = styled.h1`
  font-size: 5em;
  color: #e74c3c; /* A striking red color */
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db; /* A calm blue color */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9; /* Darken the blue slightly on hover */
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>
        Oops! The page you are looking for could not be found.
      </ErrorMessage>
      <HomeLink to="/">Go back to the homepage</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFound;
