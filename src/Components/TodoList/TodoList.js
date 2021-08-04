import React from "react";
import "./TodoList.css";
import Button from "../Button/Button";

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
                    <Button content="✏️"/>
                    <Button content = "Delete" onClick={()=> deleteTodo(item.id)}/>
                </div>
                )
            }
            )
        }
        </div>
    )
}

export default TodoList;