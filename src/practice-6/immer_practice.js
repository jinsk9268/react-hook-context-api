import { useState, useCallback } from 'react';
import produce from 'immer';

const state = {
  posts: [
    {
      id: 1,
      title: '제목',
      body: '내용',
      comments: [{ id: 1, text: '나는 할 수 있다' }]
    },
    {
      id: 2,
      title: '제목',
      body: '내용',
      comments: [{ id: 2, text: '나는 할 수 있다 그럼그럼' }]
    }
  ],
  selectedId: 1
};

// immer 미사용
// posts 배열 안의 id 가 1 인 post 객체를 찾아서,
//  comments 에 새로운 댓글 객체를 추가
const nextState = {
  ...state,
  posts: state.posts.map(post =>
    post.id === 1
      ? {
          ...post,
          comments: post.comments.concat({
            id: 3,
            text: '새로운거 나도 할 수 있지'
          })
        }
      : post
  )
};

// immer 사용
const immerState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '할수있고 말고'
  });
});

// ---------------------------------------------

// 함수형 업데이트
const [todo, setTodo] = useState({
  text: 'hello',
  done: false
});

const onClick = useCallback(() => {
  setTodo(todo => ({ ...todo, done: !todo.done }));
}, []);

// immer 함수형 업데이트
const updater = produce(draft => {
  draft.done = !draft.done;
});

const nextTodo = updater(todo);

console.log(nextTodo);
// {text:'hello', done:true}

// produce가 반환하는 것이 업데이트 함수가 되기 때문에
// useState의 업데이트 함수를 사용할 때 아래와 같이 구현 가능하다
const immerOnClick = useCallback(() => {
  setTodo(
    produce(draft => {
      draft.done = !draft.done;
    })
  );
}, []);
