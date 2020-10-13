import { useState, useCallback } from 'react';

const useInputs = initialForm => {
  const [form, setForm] = useState(initialForm);

  // onChange event
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    // 객체에서 리터럴 표현을 반환하기 위해서는 함수 본문을 괄호 속에 넣어야 한다
    setForm(form => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
};

export default useInputs;
