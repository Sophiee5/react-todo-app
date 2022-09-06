import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { List } from "./List";

export default function Lists(props) {
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
                    <List
                      key={data.key}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={props.todoData}
                      setTodoData={props.setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
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
