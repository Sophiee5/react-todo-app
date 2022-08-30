import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

export default function List(props) {
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

  //array.prototype.filter() : 어떠한 데이터 배열 안에서 주어진 함수의 테스트(조건)를 통과하는 데이터만을 가지고 새로운 배열에 담아준다.
  const handleClick = (id) => {
    let newTodoData = props.todoData.filter((data) => data.id !== id);
    props.setTodoData(newTodoData);
  };

  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함되어있다.
    // console.log("result :", result);
    // 목적지가 없으면 (이벤트 취소) 이 함수를 종료
    if (!result.destination) return;

    // todoData를 사용하기 위해 (불변성위해) 새로운 변수에 담아준다.
    const newTodoData = props.todoData;
    // 1. 변경시키려는 아이템을 배열에서 지워준다. (source > index)
    // 2. return 값으로 지워진 아이템을 잡아준다.
    // 새로운 (순서를 바꾼) 데이터 담아줄 변수 선언 (, 1은 무슨뜻이지?)
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    // 원하는 자리에 reorderedItem을 insert 해준다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    props.setTodoData(newTodoData);
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            // droppable 사용해서 전해주는 정보를 div 요소에다가 전달
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {props.todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
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
                          defaultChecked={false}
                          onChange={() => handleCompleteChange(data.id)}
                        />
                        <span
                          className={
                            data.completed ? "line-through" : undefined
                          }
                        >
                          {data.title}
                        </span>
                      </div>
                      <div className="items-center">
                        <button
                          className="px-4 py-2 float-right"
                          onClick={() => handleClick(data.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {/* 드래그 앤 드롭 시 효과를 좀 더 자연스럽게 해주는 기능 */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
