import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    //배열 데이터 만들기
    // 예시:
    /*{
       id: "1",
       title: "공부하기",
       completed: true,
     }*/
    todoData: [],

    value: "",
  };

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  //함수만들기
  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      // todoData 안의 completed(key) 의 값이 true : false (value) 에 따라 텍스트 스타일 다르게 출력해주기
      textDecoration: completed ? "line-through" : "none",
    };
  };

  //array.prototype.filter() : 어떠한 데이터 배열 안에서 주어진 함수의 테스트(조건)를 통과하는 데이터만을 가지고 새로운 배열에 담아준다.
  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter((data) => data.id !== id);
    this.setState({ todoData: newTodoData });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    //form 안에서 input을 전송을 할때 페이지가 리로드 되는 것을 막아줌.
    e.preventDefault();

    //새로운 할일 데이터 추가해주기
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    // 전개 연산자를 이용해서 기존에 있던 할 일 + 새로운 일 추가
    this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
  };

  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      console.log(data);
      return data;
    });
    this.setState({ todoData: newTodoData });
  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((data) => (
            <div style={this.getStyle(data.completed)} key={data.id}>
              <input
                type="checkbox"
                defaultChecked={false}
                onChange={() => this.handleCompleteChange(data.id)}
              />
              {data.title}
              <button
                style={this.btnStyle}
                onClick={() => this.handleClick(data.id)}
              >
                x
              </button>
            </div>
          ))}

          <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
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
}
