import React, { useEffect } from 'react';

const User = ({ user, onRemove, onToggle }) => {
  // componentDidMount
  // 처음 마운트될 때 한번만 호출
  useEffect(() => {
    // 마운트 됐을때 (화면에 처음 나타날 때)
    console.log('컴포넌트가 화면에서 나타남');
    // 언마운트 됐을때 (화면에 사라질 때)
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  // // componentDidUpdate
  // // 처음 마운트 될 때에도 호출, deps 에 지정한 값이 바뀔 때도 호출
  // // deps에 특정 값이 있으면 언마운트시에도 호출, 값이 바뀌기 직전에도 호출
  // useEffect(() => {
  //   console.log('user 값이 설정됨');
  //   console.log(user);

  //   return () => {
  //     console.log('user가 바뀌기 전...');
  //     console.log(user);
  //   };
  // }, [user]);

  // // deps 파라미터를 생략하면 컴포넌트가 리렌더링 될 때마다 호출된다
  // useEffect(() => {
  //   console.log(user);
  // });

  return (
    <div>
      <b
        style={{ cursor: 'pointer', color: user.active ? 'green' : 'black' }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>{' '}
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
};

export default React.memo(User);

// useEffect를 사용하여 마운트/언마운트/업데이트
// 마운트 : 컴포넌트가 처음 나타났을 때
// 언마운트 : 컴포넌트가 사라졌을 때
// 업데이트 : 특정 props가 바뀔 때
// 를 말하며 좀더 구체적으로 얘기하자면
// ---------------------------------------------------
// 마운트 (componentDidMount)
// -. props로 받은 값을 컴포넌트의 로컬 상태로 설정할 때
// -. 외부 API를 요청할 때 (REST API 등)
// -. 라이브러리를 사용할 때 (D3, Video.js 등)
// -. setInterval 을 통한 반복작업, 혹은 setTimeout을 통한 작업 예약을 할 때
// 언마운트 (clean up function)
// -. setInterval, setTimeout 을 사용하여 등록한 작업을 clear 할때 (clearInverval, clearTimeout)
// -. 라이브러리 인스턴스를 제거할 때
// 업데이트 (componentDidUpdate)
// -. 컴포넌트가 처음 마운트 될 때도 호출이 되고
// -. 지정한 값이 바뀔 때에도 호출이 되고
// -. deps 안에 특정 값이 있다면 언마운트 시에도 호출이 되고
// -. 값이 바뀌기 직전에도 호출이 된다
// ---------------------------------------------------
