import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import Dropdown from "react-dropdown";
import { useTodoProvider } from "../../Context/TodoProvider/TodoProvider";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

function TodoList() {
  const options = ["All", "low", "medium", "high"];
  const sortOptions = [
    "None",
    "A to Z",
    "Z to A",
    "High to Low",
    "Low to High",
  ];
  const { state, dispatch, data } = useTodoProvider();
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    setFinalData(data);
  }, [data, state]);

  const onDragEnd = (result) => {
    const { draggableId, destination, source } = result;
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
    if (destination.droppableId !== source.droppableId) {
      dispatch({ type: "UPDATE_PROGRESS", payload: draggableId });
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="inprogress">
          <div className="inprogressHeading">
            <div>
              <h2 className="heading">Inprogress</h2>
            </div>
            <div className="dropdown">
              <Dropdown
                options={sortOptions}
                onChange={(e) => dispatch({ type: "SORT", payload: e.value })}
                value={state.sort}
              />
            </div>
            <div className="dropdown">
              <Dropdown
                options={options}
                onChange={(e) => dispatch({ type: "FILTER", payload: e.value })}
                value={state.filter}
              />
            </div>
          </div>

          <Droppable droppableId="list">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? "draggingOver" : ""}
              >
                {finalData.map((item, index) => {
                  if (item.status === "Inprogress") {
                    return (
                      <div className="todos" key={item.id}>
                        <TodoItem item={item} index={index} />
                      </div>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div>
          <h2 className="heading">Done</h2>
          <Droppable droppableId="list2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? "draggingOver" : ""}
              >
                {finalData.map((item, index) => {
                  if (item.status === "Done") {
                    return (
                      <div className="todos" key={item.id}>
                        <TodoItem item={item} index={index} />
                      </div>
                    );
                  }
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

export default TodoList;
