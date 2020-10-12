import React, { useReducer, useRef, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

// useMemo를 사용한 연산값 재사용
const countActiveUsers = users => {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
};

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'jin',
      email: 'jin@test.com',
      active: true
    },
    {
      id: 2,
      username: 'kim',
      email: 'kim@test.com',
      active: false
    },
    {
      id: 3,
      username: 'lee',
      email: 'lee@test.com',
      active: false
    }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: { id: nextId.current, username, email }
    });
    nextId.current += 1;
  }, [email, username]);

  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE_USER', id });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE_USER', id });
  }, []);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수 : 0</div>
    </>
  );
};

export default App;

// useReducer
// 1.
// CHANGE_INPUT 이라는 액션 객체를 사용하여 inputs 상태를 업데이트
// reducer 함수에서 새로운 상태를 만들 때에는 불변성을 지켜주어야 하므로
// 스프레드 연산자 사용
// 2.
// CREATE_USER 이라는 액션 객체를 사용하여 users 배열 추가
// inputs 상태는 initialState.inputs 를 사용하고
// users는 불번성을 지켜주기위해 concat 함수로 액션의 결과물을 추가한다
// 3.
// TOGGLE_USER 라는 액션 객체를 사용하여 state 객체의 내용을 가져오는데
// state 객체에서 users 의 밸류는
// state 의 객체의 users 배열을 바탕으로
// user.id 가 action객체의 id와 같으면
// users 의 벨류의 active 를 반전시킨 상태로 업데이트하고
// 아니면 그냥 그대로 반환
// 4.
// REMOVE_USER 라는 액션 객체를 사용하여 state 객체 내용을 가져오는데
// users 벨류는 state 의 users 배열을 바탕으로
// user.id 가 action 객체의 id와 같지 않은 것만 반환한다

// ----------------------------------------------

// useReducer , useState 뭘 쓸까?
// 답은 없다
// 컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자, 문자열, boolean 이면 useState
// 컴포넌트에서 관리하는 값이 여러개고 상태의 구조가 복잡해지면 useReducer
