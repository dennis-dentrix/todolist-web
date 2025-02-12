import styled from 'styled-components';

const UserContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const UserTitle = styled.h2`
  color: #333;
`;

const UserInfo = styled.p`
  color: #555;
`;

const User = () => {
  // Replace with actual user data from your backend
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <UserContainer>
      <UserTitle>User Profile</UserTitle>
      <UserInfo>Name: {user.name}</UserInfo>
      <UserInfo>Email: {user.email}</UserInfo>
      {/* Add more user-related information and functionality here */}
    </UserContainer>
  );
};

export default User;
