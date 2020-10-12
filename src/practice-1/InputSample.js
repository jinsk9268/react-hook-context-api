import React, { useState } from 'react';

function InputSample() {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return (
    <div>
      {/* 주석-1 */}
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;

// 주석-1
// <input onChange={onChange} value={text} />
// value에 {text} 넣는 이유는 상태가 바뀌었을때 input의 내용도 업데이트 되기 때문
// 예를 들어 초기화
