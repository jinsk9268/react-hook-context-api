import React, { useContext, useRef } from 'react';
import { UserDispatch } from './App';
import useInputs from './hooks/useInputs';

const CreateUser = () => {
  // custom hook 사용
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: ''
  });

  const nextId = useRef(4);

  const dispatch = useContext(UserDispatch);

  const onCreate = () => {
    dispatch({
      type: 'CREATE_USER',
      user: { id: nextId.current, username, email }
    });
    reset();
    nextId.current += 1;
  };

  return (
    <div>
      <input
        placeholder='계정명'
        name='username'
        onChange={onChange}
        value={username}
      />
      <input
        placeholder='이메일'
        name='email'
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default React.memo(CreateUser);

// React.memo
// 컴포넌트 리렌더링 방지를 위해 사용
// 컴포넌트의 props가 바뀌지 않았다면, 리렌더링을 방지하여
// 컴포넌트의 리렌더링 성능 최적화를 해줄수 있다
// 이 함수를 사용하면 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링 하도록 설정할 수 있다
// export default React.memo(CreateUser); 이 형식으로 감싸 주면 된다
