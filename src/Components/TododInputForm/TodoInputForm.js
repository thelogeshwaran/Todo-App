import React, { useState } from "react";
import "./TodoInputForm.css";
import Button from "../Button/Button";

function TodoInputForm({ onSubmitTodo }){
    const [ inputTodo, setInputTodo] = useState("");
    
    return(
            <div >
                <form onSubmit={()=> {onSubmitTodo(inputTodo); setInputTodo("")}}>
                    <div className="inputContent">
                        <div className="todoInput">
                            <input value={inputTodo} placeholder="Enter Todo" onChange={(e)=> setInputTodo(e.target.value)}></input>
                        </div>
                        <Button content="Add"/>
                    </div>
                </form>
            </div>
    )
}

export default TodoInputForm;