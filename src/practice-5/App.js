import React, { useReducer, useMemo } from 'react';
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

// UserDispatch 라는 이름으로 context 생성
export const UserDispatch = React.createContext(null);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
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

// ----------------------------------------------

// Context API
// 리액트의 Context API를 사용하면 프로젝트 안에서 전역적으로 사용할 수 있는 값을 관리할수 있다
// 상태, 값 모두 가능 => 값은 함수, 외부 라이브러리 인스턴스, DOM도 가능
// Context를 만들때는 React.createContext() 라는 함수를 사용
// createContext 의 파라미터에는 Context의 기본값을 설정할 수 있다
// ex) const UserDispatch = React.createContext(null); => 기본값 null
// Context를 만들면 Context 안에 Provider라는 컴포넌트가 들어있는데
// 이 Provider라는 컴포넌트를 통하여 Context의 값을 정할 수 있다
// 컴포넌트를 사용할 때, value 라는 값을 설정해주면 된다
// <UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>
// 이렇게 설정해주고 나면 Provider에 의하여 감싸진 컴포넌트 중
// 어디서든지 우리가 Context 의 값을 다른 곳에서 바로 조회해서 사용할 수 있다
// 위의 예시는 UserDispatch 라는 Context를 만들어서 어디서든지 dispatch를 꺼내쓸 수 있도록 준비한 것이다
// 사용하고 싶을 땐 아래와 같이 사용하면 된다
// import { UserDispatch } from './App';
// const dispatch = useContext(UserDispatch);
// context를 사용하기 위해선  useContext가 필요하다
