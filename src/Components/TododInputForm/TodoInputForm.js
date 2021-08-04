import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./TodoInputForm.css"

function TodoInputForm({ todos,setTodos }){
    const [ inputTodo, setInputTodo] = useState("")

    function addTodo(){
        if(inputTodo){
            const newTodo = {
                id : uuidv4(),
                todo : inputTodo,
                status : "Inprogress"
            }
            const data = [...todos, newTodo]
            setTodos(data)
            localStorage.setItem("todos", JSON.stringify(data))
            setInputTodo("")
        }else{
            alert("Enter valid input")
        }
    }

    return(
            <div >
                <form onSubmit={()=> addTodo()}>
                    <div className="inputContent">
                        <div className="todoInput">
                            <input value={inputTodo} placeholder="Enter Todo" onChange={(e)=> setInputTodo(e.target.value)}></input>
                        </div>
                        <div className="todoButton">
                            <button type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </div>
    )
}

export default TodoInputForm;