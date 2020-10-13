import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = ({ user }) => {
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{ cursor: 'pointer', color: user.active ? 'green' : 'black' }}
        onClick={() => {
          dispatch({ type: 'TOGGLE_USER', id: user.id });
        }}
      >
        {user.username}
      </b>{' '}
      <span>({user.email})</span>
      <button
        onClick={() => {
          dispatch({ type: 'REMOVE_USER', id: user.id });
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default React.memo(User);
