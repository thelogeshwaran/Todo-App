import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
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

    function addTodo(inputTodo){
        if(inputTodo){
            const newTodo = {
                id : nanoid(),
                todo : inputTodo,
                status : "Inprogress"
            }
            const data = [...todos, newTodo]
            setTodos(data)
            localStorage.setItem("todos", JSON.stringify(data))
        }else{
            alert("Enter valid input")
        }
    }
    
    return (
        <div className="todoBody">
            <div className="todoHeading">
                <h1>Todo</h1>
            </div>
            <TodoInputForm onSubmitTodo ={addTodo} placeholder="Enter Todo" value="" buttonValue="Add"/>
            <TodoList todos ={todos} setTodos = {setTodos}/>
        </div>
        )
}

export default Todo;