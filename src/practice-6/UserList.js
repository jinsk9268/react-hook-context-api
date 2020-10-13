import React from 'react';
import User from './User';

const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
};

export default React.memo(UserList);
