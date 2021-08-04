import React from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";

function TodoList({todos, setTodos}){
    function updateTodo(id){
        const updatedTodo = todos.map(item =>{
            if(item.id === id){
                item.status = item.status === "Done" ? "Inprogress" : "Done";
                return item;
            }
            return item;
        })
        setTodos(updatedTodo)
        localStorage.setItem("todos", JSON.stringify(updatedTodo))        
    }

    function deleteTodo(id){
        const filteredTodo = todos.filter((item)=> item.id !== id)
        setTodos(filteredTodo)
        localStorage.setItem("todos", JSON.stringify(filteredTodo))
    }
    function editTodo(todo, id){
        const updatedTodo = todos.map(item =>{
            if(item.id === id){
                item.todo = todo;
                return item;
            }
            return item;
        })
        setTodos(updatedTodo)
        localStorage.setItem("todos", JSON.stringify(updatedTodo))
    }
    return(
        <div>
            {
             todos.map((item) => (
                <div className="todos" key={item.id}>
                    <TodoItem item ={item} deleteTodo={deleteTodo} updateTodo={updateTodo} editTodo={editTodo}/>
                </div>
                )
            )
        }
        </div>
    )
}

export default TodoList;