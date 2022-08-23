import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    //form 안에서 input을 전송을 할때 페이지가 리로드 되는 것을 막아줌.
    e.preventDefault();

    //새로운 할일 데이터 추가해주기
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    // 전개 연산자를 이용해서 기존에 있던 할 일 + 새로운 일 추가
    // ({ todoData: [...todoData, newTodo], value: "" });
    // prev 함수 이용하여 이전의 데이터를 가져와서 새로운 데이터를 추가해 줌
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        {/* <h1 className="text-3xl font-bold underline">Tailwindcss 테스트!!</h1> */}

        <List todoData={todoData} setTodoData={setTodoData} />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
