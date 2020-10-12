import React from 'react';

const User = ({ user }) => {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
};

const UserList = () => {
  const users = [
    {
      id: 1,
      username: 'jin',
      email: 'jin@test.com'
    },
    {
      id: 2,
      username: 'kim',
      email: 'kim@test.com'
    },
    {
      id: 3,
      username: 'lee',
      email: 'lee@test.com'
    }
  ];
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
};

export default UserList;
