import React, { useState } from "react";
import Button from "../Button/Button";
import "./TodoItem.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useTodoProvider } from "../../Context/TodoProvider";
import { Draggable } from "react-beautiful-dnd";
import { db } from "../../Firebase/Firebase";
import { Link } from "react-router-dom";
import { useAuthProvider } from "../../Context/AuthProvider";

function TodoItem({ item, index }) {
  const [edit, setEdit] = useState(false);
  const options = ["low", "medium", "high"];
  const { dispatch } = useTodoProvider();
  const { currentUser } = useAuthProvider();

  function editInput(updatedValue) {
    if (updatedValue) {
      setEdit(false);
      db.collection("Todos")
        .doc(currentUser.uid)
        .collection("todos")
        .doc(item.id)
        .update({
          todo: updatedValue,
        })
        .then(() => {
          dispatch({
            type: "UPDATE_EDITDATA",
            payload: { id: item.id, value: updatedValue },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function deleteTodo(id) {
    db.collection("Todos")
      .doc(currentUser.uid)
      .collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "UPDATE_DELETEDATA", payload: id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updatePriority(id, value) {
    db.collection("Todos")
      .doc(currentUser.uid)
      .collection("todos")
      .doc(id)
      .update({
        priority: value,
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PRIORITY",
          payload: { id: id, value: value },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateProgress(id, currentStatus) {
    let updatedStatus = currentStatus === "Inprogress" ? "Done" : "Inprogress";
    db.collection("Todos")
      .doc(currentUser.uid)
      .collection("todos")
      .doc(id)
      .update({
        status: updatedStatus,
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PROGRESS",
          payload: { id: item.id, value: updatedStatus },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={snapshot.isDragging ? "dragging" : ""}
        >
          {edit ? (
            <TodoInputForm
              value={item.todo}
              onSubmitTodo={editInput}
              buttonValue="update"
            />
          ) : (
            <div className="todoItem">
              <input
                className="todoCheckbox"
                type="checkbox"
                defaultChecked={item.status === "Done" ? true : false}
                onChange={() => updateProgress(item.id, item.status)}
              />
              <Link to={`/todo/${item.id}`} className="link">
                <div className="todoMessage">{item.todo}</div>
              </Link>
              <div onClick={() => setEdit(true)}>
                <Button content="✏️" />
              </div>
              <Button onClick={() => deleteTodo(item.id)} content="Delete" />
              <div>
                <Dropdown
                  className="dropdown"
                  options={options}
                  onChange={(e) => updatePriority(item.id, e.value)}
                  value={item.priority}
                  placeholder="Select an option"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default TodoItem;
