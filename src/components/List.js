import React from "react";

export const List = ({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
}) => {
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

  //array.prototype.filter() : 어떠한 데이터 배열 안에서 주어진 함수의 테스트(조건)를 통과하는 데이터만을 가지고 새로운 배열에 담아준다.
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };
  return (
    <div
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      className={`${
        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
    >
      <div className="items-center">
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={() => handleCompleteChange(id)}
        />
        <span className={completed ? "line-through" : undefined}>{title}</span>
      </div>
      <div className="items-center">
        <button
          className="px-4 py-2 float-right"
          onClick={() => handleClick(id)}
        >
          x
        </button>
      </div>
    </div>
  );
};
