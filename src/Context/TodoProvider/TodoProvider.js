import React, { useReducer, useContext, createContext, useEffect } from "react";
import { reducerFunc, initialState } from "../../Reducer/Reducer";
import { getProducts } from "../../Utils/Products/GetProducts";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (data) {
      dispatch({ type: "DATA_FROM_LOCAL", payload: data });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.data));
  }, [state.data]);

  const data = getProducts(state);
  return (
    <TodoContext.Provider value={{ data, state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoProvider() {
  return useContext(TodoContext);
}
