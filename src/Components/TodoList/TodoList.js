import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import Dropdown from 'react-dropdown';


function TodoList({ todos, setTodos, priorityFilter, setPriorityFilter }) {
    const options = [ 'All','low', 'medium', 'high' ];
    
    function updateTodo(id) {
        const updatedTodo = todos.map(item => {
            if (item.id === id) {
                item.status = item.status === "Done" ? "Inprogress" : "Done";
                return item;
            }
            return item;
        })
        setTodos(updatedTodo)
        localStorage.setItem("todos", JSON.stringify(updatedTodo))
    }

    function deleteTodo(id) {
        const filteredTodo = todos.filter((item) => item.id !== id)
        setTodos(filteredTodo)
        localStorage.setItem("todos", JSON.stringify(filteredTodo))
    }
    function editTodo(todo, id) {
        const updatedTodo = todos.map(item => {
            if (item.id === id) {
                item.todo = todo;
                return item;
            }
            return item;
        })
        setTodos(updatedTodo)
        localStorage.setItem("todos", JSON.stringify(updatedTodo))
    }
    function updatePriority(id, priority){
        const updatedTodo = todos.map(item => {
            if (item.id === id) {
                item.priority = priority;
                return item;
            }
            return item;
        })
        setTodos(updatedTodo)
        localStorage.setItem("todos", JSON.stringify(updatedTodo))
    }

    return (
        <div>
            <div className="inprogress">
                <div className="inprogressHeading">
                    <div >
                        <h2 className="heading">Inprogress</h2>
                    </div>
                    <div className="dropdown">
                        <Dropdown options={options} onChange={(e)=> setPriorityFilter(e.value)} value={priorityFilter} placeholder="Select an option" />
                    </div>
                </div>
                <div>
                {
                    todos.map((item) => {
                        if (item.status === "Inprogress") {
                            return (
                                <div className="todos" key={item.id}>
                                    <TodoItem item={item} deleteTodo={deleteTodo} updateTodo={updateTodo} editTodo={editTodo} updatePriority={updatePriority} />
                                </div>
                            )
                        }
                    }
                    )
                }
                </div>
            </div>
            <div>
                <h2 className="heading">Done</h2>
                {
                    todos.map((item) => {
                        if (item.status === "Done") {
                            return (
                                <div className="todos" key={item.id}>
                                    <TodoItem item={item} deleteTodo={deleteTodo} updateTodo={updateTodo} editTodo={editTodo} updatePriority={updatePriority} />
                                </div>
                            )
                        }
                    }
                    )
                }
            </div>

        </div>
    )
}

export default TodoList;