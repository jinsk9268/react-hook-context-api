import React, { useState, useRef } from 'react';

const InputSamples = () => {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  // inputs 비구조화 할당을 통한 값 추출
  const { name, nickname } = inputs;

  // useRef를 사용한 특정 DOM 선택
  const nameInput = useRef();

  const onChange = e => {
    // e.target 비구조화 할당을 통한 값 추출
    const { value, name } = e.target;
    setInputs({
      ...inputs, // 기존 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value로 설정(업데이트)
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: ''
    });
    // reset후 name input 창에 focus가 가야 하므로
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        placeholder='이름'
        name='name'
        onChange={onChange}
        value={name} // ref 사용
        ref={nameInput}
      />
      <input
        placeholder='닉네임'
        name='nickname'
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
};

export default InputSamples;

// 리액트 상태에서 객체를 수정할 때 주의사항
// 리액트 상태에서 객체를 수정해야 할 때는
// inputs[name] = value;
// 이런 식으로 직접 수정하면 안된다
// 새로운 객체를 만들어서, 그 새로운 객체에 변화를 주고, 이를 상태로 사용해야 한다
// 그래서 기존 객체를 복사하는 ... spread 연산자를 사용해 기존 객체를 복사해준다
// 이러한 작업을 불변성을 지킨다고 한다
// 리액트에서 불변성을 지켜주어야만
// 리액트 컴포넌트에서 상태가 업데이트 됐음을 감시하고 필요한 리렌더링이 진행된다
// 만약 inputs[name] = value 이런 식으로 기존 상태를 직접 수정하게 되면
// 값을 바꿔도 리렌더링이 되지 않는다
// 리액트에서 불변성을 지켜부어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있다
// 중요!!!!!
// 리액트에서 객체를 업데이트 하게 될 때는
// 기존 객체를 직접 수정하면 안되고, 기존 객체를 바탕으로 한 새로운 객체를 만들어서
// 새 객체에 변화를 주어야 한다

// 수정 불가능한 변수의 장점
// 1.
// 변수가 수정 불가능하면 함수에서 side effect가 발생할 확률이 낮아진다
// side effect가 없는 것만으로도 프로그램의 복잡도가 상당히 줄어든다
// 또한 side effect가 없는 함수는 병렬 처리를 효율적으로 할 수 있는데
// 빅데이터 분석 프로그램으로 유명한 spark에서 함수형 언어인 scala를 주 언어로 채택한 이유도 이거다
// 2.
// 수정 불가능한 변수는 thread-safe 하므로 동기화 문제에서 자유룝다
// 두개의 쓰레드가 동시에 같은 변수를 수정하려고 하는 경우를 생각해보면 이해하기 쉽다
// but
// 성능이 중요한 경우에는 수정 가능한 변수를 써야 한다
// 예를 들어, 60fps를 목표로 하는 게임에서 캐릭터의 위치 값을 업데이트 하는 경우
// 매번 새로운 객체를 생성하는 것 보다는 기존 객체의 값을 변경하는 게 더 효율적이다

// 리액트 상태관리에서 불변성을 유지하는 이유
// 1-리액트, 리덕스 재랜더링 방식
// 리액트, 리덕스는 setState, dispatch 되었을 때 re-rendering이 발생
// 불필요한 리렌더링을 피하기 위해 shouldComponentUpdate, useCallback을 씀
// 이 메소드는 state와 props 의 변화를 감지해서 변화가 일어날 경우만! 렌더링을 허용
// 1-정리
// setState나 dispatch를 이용해서 상태를 바꾸지 않으면 리렌더링이 일어나지 않음
// 그리고 위의 메소드를 쓸 경우, 이전 state와 비교해야 하므로 원래 상태는 불변셩을 유지해줘야 함
// 2-원시타입과 참조타입
// 원시타입은 변수에 값을 재할당해도 값이 변하지 않음
// 참조타입은 변수가 같은 값을 참조하기 때문에 b를 조작해도 a도 바뀜
// 2-정리
// state를 바꾸는 과정에서 참조변수의 불변성을 유지하지 않고 바로 수정해버리면
// 기존 상태도 수정이 되어버려서 이전 state와 비교하는 것이 불가능해진다 (arr.push 메소드 같이)

// 불변성을 유지하는 방식
// 1-spread 연산자 (...)
// 2-concat 함수 (arr.concat())

// ============================================

// useRef

// js를 사용할 때에는 우리가 특정 DOM을 선택해야 하는 상황이 있다
// 그때 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM을 선택한다
// React를 사용하는 프로젝트 에서도 DOM을 찍접 선택해야 하는 상황이 발생할때도 있다
// 예를 들어 특정 엘리먼트의 크기를 가져와야 한다던지,
// 스크롤바 위치를 가져오거나 설정해야 된다던지
// 또는 포커스를 설정해줘야 된다던지 등
// 리액트에서는 ref라는 것을 사용한다
// 클래스형 컴포넌트에서는 콜백 함수를 사용하거나 React.createRef라는 함수를 사용하고
// 함수형 컴포넌트 에서는 useRef라는 hook 함수를 사용한다

// useRef() 를 사용하여 Ref 객체를 만들고
// 이 객체를 우리가 선택하고 싶은 DOM에 ref 값으로 설정한다
// 그러면 Ref 객체이 .current 값은 우리가 원하는 DOM을 가르키게 된다
