import React, { useState } from "react";
import Button from "../Button/Button";
import "./TodoItem.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";

function TodoItem({ item, deleteTodo, updateTodo, editTodo }) {
    const [edit, setEdit] = useState(false)
    function editInput(updatedValue) {
        editTodo(updatedValue, item.id);
        setEdit(false)
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
                    </div>
                )
            }
        </>
    )
}

export default TodoItem;