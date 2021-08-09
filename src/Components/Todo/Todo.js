import React from "react";
import { nanoid } from 'nanoid';
import TodoList from "../TodoList/TodoList";
import "./Todo.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";
import { useTodoProvider } from "../../Context/TodoProvider/TodoProvider"


function Todo() {
    const { dispatch } = useTodoProvider();

    function addTodo(inputTodo) {
        if (inputTodo) {
            const newTodo = {
                id: nanoid(),
                todo: inputTodo,
                status: "Inprogress",
                priority: "high"
            }
            dispatch({ type: "ADD_DATA", payload: newTodo })
        } else {
            alert("Enter valid input")
        }
    }


    return (
        <div className="todoBody">
            <div className="todoHeading">
                <h1>Todo</h1>
            </div>
            <TodoInputForm onSubmitTodo={addTodo} placeholder="Enter Todo" value="" buttonValue="Add" />
            <TodoList />
        </div>
    )
}

export default Todo;