import React, { useEffect, useState } from "react";
import TodoList from "../TodoList/TodoList";
import "./Todo.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";


function Todo() {
    const [todos, setTodos] = useState([])
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("todos"))
        if(data){
            setTodos(data)
        }        
    },[])
    
    return (
        <div className="todoBody">
            <div className="todoHeading">
                <h1>Todo</h1>
            </div>
            <TodoInputForm todos ={todos} setTodos = {setTodos}/>
            <TodoList todos ={todos} setTodos = {setTodos}/>
        </div>
        )
}

export default Todo;