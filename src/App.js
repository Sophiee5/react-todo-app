import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

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
    <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData} />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
