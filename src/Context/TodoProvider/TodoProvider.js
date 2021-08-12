import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { db } from "../../Firebase/Firebase";
import { reducerFunc, initialState } from "../../Reducer/Reducer";
import { getProducts } from "../../Utils/Products/GetProducts";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  function fetchData() {
    db.collection("Todos")
      .get()
      .then((item) => {
        let document = item.docs.map((doc) => doc.data());
        console.log(document);
        if (document) {
          dispatch({ type: "DATA_FROM_LOCAL", payload: document });
        }
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const tempdata = useCallback(() => getProducts(state), [state]);
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
