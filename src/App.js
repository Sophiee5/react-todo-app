import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  //함수만들기
  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      // todoData 안의 completed(key) 의 값이 true : false (value) 에 따라 텍스트 스타일 다르게 출력해주기
      textDecoration: completed ? "line-through" : "none",
    };
  };

  //array.prototype.filter() : 어떠한 데이터 배열 안에서 주어진 함수의 테스트(조건)를 통과하는 데이터만을 가지고 새로운 배열에 담아준다.
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

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

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      console.log(data);
      return data;
    });
    setTodoData(newTodoData);
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        {todoData.map((data) => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => handleCompleteChange(data.id)}
            />
            {data.title}
            <button style={btnStyle} onClick={() => handleClick(data.id)}>
              x
            </button>
          </div>
        ))}

        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="해야 할 일을 입력하세요."
            value={value}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="입력"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    </div>
  );
}
