import React from "react";
import { nanoid } from "nanoid";
import TodoList from "../TodoList/TodoList";
import "./Todo.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";
import { useTodoProvider } from "../../Context/TodoProvider/TodoProvider";
import TodoFilter from "../TodoFilter/TodoFilter";
import { db } from "../../Firebase/Firebase";

function Todo() {
  const { dispatch, data } = useTodoProvider();
  const tempData = data.filter((item) => item.status === "Inprogress");

function addTodo(inputTodo) {
    if (inputTodo) {
      const newTodo = {
        id: nanoid(),
        todo: inputTodo,
        status: "Inprogress",
        priority: "high",
      }
      db.collection("Todos").doc(newTodo.id).set(newTodo)
      .then(()=>{
        dispatch({ type: "ADD_DATA", payload: newTodo });
      })
      .catch((err)=>{
        console.log(err)
      })
      
    } else {
      alert("Enter valid input");
    }
  }

  return (
    <div className="todoBody">
      <TodoInputForm
        onSubmitTodo={addTodo}
        placeholder="Enter Todo"
        value=""
        buttonValue="Add"
      />
      <div className="heading">
        <h1>Inprogress</h1>
        <TodoFilter />
      </div>
      <TodoList data={tempData} />
    </div>
  );
}

export default Todo;
