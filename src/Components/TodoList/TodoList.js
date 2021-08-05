import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import Dropdown from 'react-dropdown';


function TodoList({ todos, setTodos }) {
    const options = [ 'All','low', 'medium', 'high' ];
    const sortOptions = ["Name", "Priority"];
    const [ finalTodo, setFinalTodo ] = useState([])
    const [ priorityFilter, setPriorityFilter ] = useState("All");
    const [ sortFilter, setSortFilter ] = useState('Name');

    useEffect(()=>{
        let initFilterData;
        if(todos){
            if(priorityFilter === "All"){
                initFilterData = todos;
            }else{
                console.log(priorityFilter)
                const filteredData = todos.filter(item => item.priority === priorityFilter);
                initFilterData = filteredData;
            }

            switch (sortFilter) {
                case "Name":
                    const sortedName = initFilterData?.sort((a,b)=> {
                        if(a.todo?.toLowerCase() < b.todo?.toLowerCase()) return -1;
                        if(a.todo?.toLowerCase() > b.todo?.toLowerCase()) return 1;
                        return 0;
                    });
                    setFinalTodo(sortedName)
                    break;
                case "Priority":
                    console.log("came")
                    const sortedPriority = initFilterData?.sort((a,b) => {
                        if(a.priority === b.priority) return 0;
                        if(a.priority === "high" || a.priority === "medium" && b.priority === "low" ){
                            return -1;
                        }else if(b.priority === "high" || b.priority === "medium" && a.priority === "low" ){
                            return 1;
                        }
                    })
                    
                    console.log(sortedPriority)
                    setFinalTodo(sortedPriority)
                default:
                    break;
            }
        }        
    },[priorityFilter,sortFilter,todos])
    
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

    console.log(finalTodo,sortFilter)
    return (
        <div>
            <div className="inprogress">
                <div className="inprogressHeading">
                    <div >
                        <h2 className="heading">Inprogress</h2>
                    </div>
                    <div>
                    <Dropdown options={sortOptions} onChange={(e)=> setSortFilter(e.value)} value={sortFilter}  />
                    </div>
                    <div className="dropdown">
                        <Dropdown options={options} onChange={(e)=> setPriorityFilter(e.value)} value={priorityFilter} />
                    </div>
                </div>
                <div>
                {
                    finalTodo.map((item) => {
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
                    finalTodo.map((item) => {
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