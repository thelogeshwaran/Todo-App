import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import TodoList from "../TodoList/TodoList";
import "./Todo.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";


function Todo() {
    const [todos, setTodos] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState("All");

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("todos"))
        if(data){
            if(priorityFilter === "All"){
                setTodos(data);
            }else{
                console.log(priorityFilter)
                const filteredData = data.map(item => item.priority === priorityFilter ? item : "");
                console.log(filteredData)
                setTodos(filteredData)
            }
        }        
    },[priorityFilter])

    function addTodo(inputTodo){
        if(inputTodo){
            const newTodo = {
                id : nanoid(),
                todo : inputTodo,
                status : "Inprogress",
                priority: "high"
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
            <TodoList todos ={todos} setTodos = {setTodos} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}/>
        </div>
        )
}

export default Todo;