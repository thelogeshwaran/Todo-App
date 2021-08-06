import React from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import Dropdown from 'react-dropdown';
import { useTodoProvider } from "../../Context/TodoProvider/TodoProvider"


function TodoList() {
    const options = [ 'All','low', 'medium', 'high' ];
    const sortOptions = ["Name", "Priority"];
    const { state, dispatch,data } = useTodoProvider();

    return (
        <div>
            <div className="inprogress">
                <div className="inprogressHeading">
                    <div >
                        <h2 className="heading">Inprogress</h2>
                    </div>
                    <div className="dropdown">
                        <Dropdown options={sortOptions} onChange={(e)=> dispatch ({ type: "SORT", payload: e.value})} value={state.sort}  />
                    </div>
                    <div className="dropdown">
                        <Dropdown options={options} onChange={(e)=> dispatch ({ type: "FILTER", payload: e.value})} value={state.filter} />
                    </div>
                </div>
                <div>
                {
                    data.map((item) => {
                        if (item.status === "Inprogress") {
                            return (
                                <div className="todos" key={item.id}>
                                    <TodoItem item={item} />
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
                  data.map((item) => {
                        if (item.status === "Done") {
                            return (
                                <div className="todos" key={item.id}>
                                    <TodoItem item={item} />
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