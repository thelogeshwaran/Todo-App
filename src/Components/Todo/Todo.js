import React from "react";
import { nanoid } from "nanoid";
import TodoList from "../TodoList/TodoList";
import "./Todo.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";
import { useTodoProvider } from "../../Context/TodoProvider";
import TodoFilter from "../TodoFilter/TodoFilter";
import { db } from "../../Firebase/Firebase";
import { useAuthProvider } from "../../Context/AuthProvider";
import { observer } from "mobx-react-lite"

function Todo() {
  const { rootTree } = useTodoProvider();
  const filtered = rootTree.filteredData();
  const tempData = filtered.filter((item) => item.status === "Inprogress");
  const { currentUser } = useAuthProvider();
  

  function addTodo(inputTodo) {
    if (inputTodo) { 
      const newTodo = {
        id: nanoid(),
        todo: inputTodo,
        status: "Inprogress",
        priority: "high",
      };
      db.collection("Todos")
        .doc(currentUser.uid)
        .collection("todos")
        .doc(newTodo.id)
        .set(newTodo)
        .then(() => {
          rootTree.addNewTodo(newTodo)
        })
        .catch((err) => {
          console.log(err);
        });
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

export default observer(Todo);
