import React, { useReducer, useContext, createContext, useEffect } from "react";


const TodoContext = createContext();

export  function TodoProvider({children}){
    const initialState = {
        data :  [],
        sort : "Name",
        filter : "All"
    }
    const [state, dispatch ]= useReducer(reducerFunc, initialState);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("todos"));
        if(data){
            dispatch({type :"DATA_FROM_LOCAL", payload: data})
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(state.data))
    }, [state.data])
    
    function reducerFunc(state, {type, payload}){
        switch (type) {
            case "DATA_FROM_LOCAL":
                return { ...state, data: payload}
            case "SORT":
                return {...state, sort : payload}
            case "FILTER":
                return {...state, filter : payload}
            case "UPDATE_PRIORITY":
                const updatedData = state.data.map(item => {
                    if(item.id === payload.id){
                        item.priority = payload.value;
                        return item
                    }
                    return item
                })
                return {...state, data : updatedData}
            case "UPDATE_PROGRESS":
                const tempData = state.data.map((item)=> ({...item}))
                const progressDataIndex = tempData.findIndex(item=> item.id === payload);
                tempData[progressDataIndex].status = tempData[progressDataIndex].status ==="Inprogress" ? "Done" : "Inprogress";
                return {...state, data : tempData}
            case "UPDATE_EDITDATA":
                const editedData = state.data.map(item => {
                    if(item.id === payload.id){
                        item.todo = payload.value;
                        return item
                    }
                    return item
                })
                return {...state, data: editedData}
            case "UPDATE_DELETEDATA":
                const deletedData = state.data.filter(item => item.id !== payload )
                return {...state, data: deletedData}
            case "ADD_DATA":
                return {...state, data:[...state.data,payload]}
            default:
                return state
        }

    }

    function sortData(data, type){

        switch (type) {
            case "Name":
                const sortedName = data.sort((a,b)=> {
                    if(a.todo?.toLowerCase() < b.todo?.toLowerCase()) return -1;
                    if(a.todo?.toLowerCase() > b.todo?.toLowerCase()) return 1;
                    return 0;
                });
                return sortedName;
            case "Priority":
                const sortedPriority = data.sort((a,b) => {
                        if(a.priority === b.priority) return 0;
                        if(a.priority === "high" || a.priority === "medium" && b.priority === "low" ){
                            return -1;
                        }else if(b.priority === "high" || b.priority === "medium" && a.priority === "low" ){
                            return 1;
                        }
                    })
                return sortedPriority
            default:
                break;
        }
    }

    function filterData(data, type){
        switch (type) {
            case "All":
                return data;
            case "low":
            case "high":
            case "medium":
                const filteredData = data.filter(item => item.priority === type)
                return filteredData;
            default:
                break;
        }
    }

    function getProducts(stateValue){
        const filteredProducts = filterData(stateValue.data, stateValue.filter)
        const sortedProducts = sortData(filteredProducts, stateValue.sort);
        return sortedProducts
    }

    const data = getProducts(state)


    
    return(
        <TodoContext.Provider value={ {data, state, dispatch}}>
            {children}
        </TodoContext.Provider>

    )
}

export function useTodoProvider(){
    return useContext(TodoContext)
}