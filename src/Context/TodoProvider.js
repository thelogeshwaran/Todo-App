import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { db } from "../Firebase/Firebase";
import { reducerFunc, initialState } from "../Reducer/Reducer";
import { getTodos } from "../Utils/Todos/GetProducts";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  function fetchData() {
    db.collection("Todos")
      .get()
      .then((item) => {
        let document = item.docs.map((doc) => doc.data());
        if (document) {
          dispatch({ type: "DATA_FROM_LOCAL", payload: document });
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const tempdata = useCallback(() => getTodos(state), [state]);
  const data = tempdata();

  return (
    <TodoContext.Provider value={{ data, state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoProvider() {
  return useContext(TodoContext);
}
