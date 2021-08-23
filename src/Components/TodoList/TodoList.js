import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import { useTodoProvider } from "../../Context/TodoProvider";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import { sortData } from "../../Utils/Todos/SortData";
function TodoList({ data }) {

  const [finalData, setFinalData] = useState([]);
  const {rootTree} = useTodoProvider();
  useEffect(() => {
      setFinalData(data)
  }, [data, rootTree.sort]);

  const onDragEnd = (result) => {
    const {  destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      const copiedData = [...data];
      const draggedItem = copiedData[source.index];
      copiedData.splice(source.index, 1);
      copiedData.splice(destination.index, 0, draggedItem);
      setFinalData(copiedData);
      return;
    }
  };

  sortData(finalData,rootTree.sort);


  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="todoList">
          <Droppable droppableId="list">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? "draggingOver" : ""}
              >
      {finalData.map((item, index) => {
        return (
          <div className="todos" key={item.id}>
            <TodoItem item={item} index={index} />
          </div>
        );
      })}
      {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default observer(TodoList);
