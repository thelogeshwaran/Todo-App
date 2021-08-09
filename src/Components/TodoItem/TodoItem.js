import React, { useState } from "react";
import Button from "../Button/Button";
import "./TodoItem.css";
import TodoInputForm from "../TododInputForm/TodoInputForm";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useTodoProvider } from "../../Context/TodoProvider/TodoProvider";
import { Draggable } from "react-beautiful-dnd";


function TodoItem({ item, index }) {

    const [edit, setEdit] = useState(false);
    const options = ['low', 'medium', 'high'];
    const { dispatch } = useTodoProvider();

    function editInput(updatedValue) {
        dispatch({ type: "UPDATE_EDITDATA", payload: { id: item.id, value: updatedValue } })
    }



    return (
        <Draggable draggableId={item.id} index={index}>
            {
                (provided, snapshot) => (
                    <div {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef} className={ snapshot.isDragging ? "dragging" : ""}>
                        {
                            edit ? (
                                <TodoInputForm value={item.todo} onSubmitTodo={editInput} buttonValue="update" />
                            ) : (
                                <div className="todoItem">
                                    <input className="todoCheckbox" type="checkbox" defaultChecked={item.status === "Done" ? true : false} onChange={() => dispatch({ type: "UPDATE_PROGRESS", payload: item.id })} />
                                    <div className="todoMessage" >
                                        {item.todo}
                                    </div>
                                    <div onClick={() => setEdit(true)}>
                                        <Button content="✏️" />
                                    </div>
                                    <Button onClick={() => dispatch({ type: "UPDATE_DELETEDATA", payload: item.id })} content="Delete" />
                                    <div>
                                        <Dropdown className="dropdown" options={options} onChange={(e) => dispatch({ type: "UPDATE_PRIORITY", payload: { id: item.id, value: e.value } })} value={item.priority} placeholder="Select an option" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </Draggable>
    )
}

export default TodoItem;