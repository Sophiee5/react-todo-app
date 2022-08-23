import React from "react";

export default function List(props) {
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const handleCompleteChange = (id) => {
    let newTodoData = props.todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      console.log(data);
      return data;
    });
    props.setTodoData(newTodoData);
  };

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
    let newTodoData = props.todoData.filter((data) => data.id !== id);
    props.setTodoData(newTodoData);
  };

  return (
    <div>
      {props.todoData.map((data) => (
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
    </div>
  );
}
