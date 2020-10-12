import React, { useState, useRef, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import Counter from './Counter';

// useMemo를 사용한 연산값 재사용
const countActiveUsers = users => {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
};

const App = () => {
  // CreateUser에 필요한 props 준비
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  // 최적화를 위한 useCallback
  // 함수형 업데이트
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  }, []);

  // users도 useState를 사용하여 컴포넌트의 상태로서 관리하기
  const [users, setUsers] = useState([
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
  ]);

  // useRef() 를 사용할 때 파라미터를 넣어주면
  // 이 값이 .current 값의 기본값이 되고
  // 수정할때는 .current 값을 수정하면 되고 조회할때는 .current 를 조회하면 된다
  const nextId = useRef(4);

  // 최적화를 위한 useCallback
  // 함수형 업데이트
  const onCreate = useCallback(() => {
    // 배열에 항목을 추가하는 로직
    // 배열에 변화를 줄 때도 객체와 마찬가지로 불변성을 유지해야 한다
    // push, splice, sort 등의 함수 사용 X
    // 사용해야 하면 기존 배열 복사 후 사용하도록
    const user = {
      id: nextId.current,
      username,
      email
    };

    // 불변성을 유지하면서 추가하는 방법
    // 1. spread 연산자 사용
    // setUsers([...users, user]);
    // 2. concat 함수 사용
    setUsers(users => users.concat(user));

    setInputs({
      username: '',
      email: ''
    });

    nextId.current += 1;
  }, [email, username]);

  // 배열의 항목 제거
  // 배열의 항목을 제거할때도 불변성을 유지해야 한다
  // 불변성을 지키면서 특정 원소를 배열에서 제거하기 위해서는
  // filter 배열 내장 함수를 사용하는 것이 가장 편하다
  // filter 함수는 배열에서 특정 조건을 만족하는 원소들만 추출하여 새로운 배열을 만든다
  // 최적화를 위한 useCallback
  // 리렌더링을 막기위해 함수형 업데이트
  const onRemove = useCallback(id => {
    // user.id 가 파라미터, 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // 삭제니까 일치하는 것은 제외되고 배열이 만들어 진다
    setUsers(users => users.filter(user => user.id !== id));
  }, []);

  // 배열의 항목 수정
  // 배열의 불변성을 유지하면서 배열을 업데이트 할 때 map 함수를 사용
  // user.id 가 id와 같으면 active를 반전시킨 상태로 새로운 배열을 반환하고
  // 아니면 기존 상태를 반환한다
  // 최적화를 위한 useCallback
  // 리렌더링을 막기위해 함수형 업데이트
  const onToggle = useCallback(id => {
    console.log('토글');
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  // useMemo를 사용하여 연산한 값 재사용하기
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count}</div>
      <Counter />
    </>
  );
};

export default App;

// useRef로 컴포넌트 안의 변수 만드는 법
// 컴포넌트에서 특정 DOM을 선택해야 할 때, ref를 사용하지만
// 한가지 용도가 더 있는데
// 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 useRef로 관리하는 것이다
// useRef로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링 되지 않는다
// 리액트 컴포넌트에서 상태는 상태를 바꾸는 함수를 호출하고 나서
// 그 다음 렌드링 이후로 업데이트 된 상태를 조회할 수 있는 반면
// useRef로 관리하고 있는 변수는 설정 후 바로 조회할 수 있다
// useRef를 사용하여 아래와 같은 값을 관리할 수 있다
// 1. setTimeout, setInterval 을 통해서 만들어진 id
// 2. 외부 라이브러리를 사용하여 생성된 인스턴스
// 3. scroll 위치

// const nextId = useRef(4); 에서 const를 사용하는 이유
// 보통 const는 변화할 수 없는 값인데  왜 const를 사용하냐면
// ref 객체레 속성값은 바뀔 수 있다

// useRef를 쓰는 이유
// const nextId = {current: 4} 또는
// let nextId = 4 와 같이 하지 않는 이유
// useRef는 일반적인 자바스크립트 객체이다. 즉 heap 영역에 저장된다
// 그래서 어플리케이션이 종료되거나 가비지 컬렉팅 될 때 까지
// 참조할 때마다 같은 메모리 주소를 가지게 되고
// 같은 메모리 주소를 가지기 때문에 === 연산이 항상 true를 반환하고
// 값이 바뀌어도 리렌더링 되지 않는다
// 하지만 함수 컴포넌트 내부에 변수를 선언하면 렌더링 될 때 마다 값이 초기화 된다

// ---------------------------------------------------------------------------------

// useMemo
// const count = useMemo(() => countActiveUsers(users), [users]);
// 활성 사용자 수를 세는건, users에 변화가 있을때만 세야되는건다
// input 값이 바뀔 때에도 컴포넌트가 리렌더링 되므로
// 불빌요할때도 호출하여서 자원이 낭비되고 있다
// 이럴때는 useMemo 라는 hook 함수를 사용하면 성능을 최적화 할 수 있다
// memo는 memoized를 의미하는데 이는 이전에 계산한 값을 재사용 한다는 이미를 가지고 있다
// useMemo의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고
// 두번째 파라미터에는 deps 배열을 넣어주면 되는데
// 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고
// 만약 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 된다

// ---------------------------------------------------------------------------------

// useCallback
// useCallback은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용한다
// 함수는 컴포넌트가 리렌더링 될 때마다 새로 만들어 진다
// 함수를 선언하는 것 자체는 사실 메모리도, CPU도, 리소스를 많이 차지하는 작업은 아니기에
// 함수를 새로 선언한다고 해서 그 자체만으로 큰 부하가 생길일은 없다
// 하지만 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 여전히 중요하다
// 그 이유는 나중에 컴포넌트에서 props가 바뀌지 않았으면
// Virtual DOM에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용 하는 최적화 작업에
// 함수를 재사용하는 것이 필수이기 때문이다
// useCallback에서 함수 안에 사용하는 상태 또는 props가 있다면, 꼭 deps 배열안에 포함 시켜야한다
// 만약 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면
// 함수 내에서 해당 값들을 참조할 때 가장 최신 값을 참조할 것이라고 보장할 수 없다
// props로 받아온 함수가 있다면 이 또한 deps 배열 안에 넣어 주어야 한다

// 기존
// const onRemove = useCallback(
//   id => {
//     setUsers(users.filter(user => user.id !== id));
//   },
//   [users]
// );
// User중 하나라도 수정하면 모든 User들이 리렌더링되고 CreateUser도 리렌더링 된다
// 왜그럴까?? 간단하다
// users 배열이 바뀔때마다 onCreate도 새로 만들어지고,
// onToggle, onRemove도 새로 만들어지기 때문에 렌더링 된다
// deps에 users가 들어있기 때문에 배열이 바뀔때마다 함수가 새로 만들어지는건 당연하다
// 이걸 최적화 하고 싶으면?
// deps에서 users를 지우고, 함수들에서 현재 useState로 관리하는 users를 참조하지 않게 하는것이다
// 그런데 무턱대고 지웠다간 업데이트가 안된다!!!!! (중요)
// 실제 onRemove, onToggle 에서 상태가 변경시 기억하지 않기 때문이다
// 그럴땐 함수형 업데이트를 사용하면 된다
// 변경
// const onRemove = useCallback(id => {
//   setUsers(users => users.filter(user => user.id !== id));
// }, []);
// 함수형 업데이트를 하게되면 setUsers 에 등록하는 콜백함수의 파라미터에서
// 최신 users를 참조할 수 있기 때문에 deps에 users를 넣지 않아도 된다
// onChange의 경우 함수형 업데이트를 해도 영향은 가지 않는다

// ---------------------------------------------------------------------------------

// 리액트 렌더링 최적화를 위한
// useCallback, useMemo, React.memo 는 컴포넌트의 성능을 실제로 개선할 수 있을 상황에서만 사용
// onClick 으로 설정해준 함수들은
// useCallback으로 재사용한다고해서 리렌더링을 막을 수 있는 것은 아니므로 굳이 그렇게할 필요 없다
// 추가적으로 렌더링 최적화를 하지 않을 경우
// 컴포넌트에 React.memo를 사용하는 것은 불필요한 props 비교한 하는것이기 때문에
// 실제로 렌더링을 방지할 수 있는 상황이 있는 경우에만 사용
