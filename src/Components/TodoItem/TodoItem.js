import React, { useState } from "react";
import Button from "../Button/Button";
import "./TodoItem.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function TodoItem({ item, deleteTodo, updateTodo, editTodo, updatePriority }) {
    const [edit, setEdit] = useState(false);
    const options = [ 'low', 'medium', 'high' ];

    function editInput(updatedValue) {
        editTodo(updatedValue, item.id);
        setEdit(false)
    }
    

      function onSele(e){
        updatePriority(item.id, e.value)
      }
    return (
        <>
            {
                edit ? (
                    <TodoInputForm value={item.todo} onSubmitTodo={editInput} buttonValue="update" />
                ) : (
                    <div className="todoItem">
                        <input className="todoCheckbox" type="checkbox" defaultChecked={item.status === "Done" ? true : false} onChange={() => updateTodo(item.id)} />
                        <div className="todoMessage" >
                            {item.todo}
                        </div>
                        <div onClick={() => setEdit(true)}>
                            <Button content="✏️" />
                        </div>
                        <div onClick={() => deleteTodo(item.id)}>
                            <Button content="Delete" />
                        </div>
                        <div>
                            <Dropdown options={options} onChange={(e)=>onSele(e)} value={item.priority} placeholder="Select an option" />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default TodoItem;