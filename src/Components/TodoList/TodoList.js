import React from "react";
import "./TodoList.css"

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


    return(
        <div>
            {
             todos.map((item) => {
                return(
                <div className="todos" key={item.id}>
                  <input className="todoCheckbox" type="checkbox" defaultChecked={ item.status === "Done" ? true : false} onChange={() => updateTodo(item.id)}/>
                    <div className="todoMessage" >{item.todo}</div>
                    <div><button className="editButton">✏️</button></div>
                    <div><button className="deleteButton" onClick={()=> deleteTodo(item.id)}>Delete</button></div>
                </div>
                )
            }
            )
        }
        </div>
    )
}

export default TodoList;