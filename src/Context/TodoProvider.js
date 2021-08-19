import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { reducerFunc, initialState } from "../Reducer/Reducer";
import { useAuthProvider } from "./AuthProvider";
import { setupRootStore } from "../Models/Setup";
import { observer } from "mobx-react-lite";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  const { currentUser } = useAuthProvider();
  const { rootTree } = setupRootStore();

  useEffect(() => {
    currentUser && rootTree.fetchTodos(currentUser.uid);
  }, [currentUser]);

  // const tempdata = useCallback(() => getTodos(state), [state]);
  // const data = tempdata();

  // const data = getTodos(rootTree)
  // const data = rootTree.todos
  // const tempData = rootTree.fitlerTodos()
  // console.log(tempData)
  
  return (
    <TodoContext.Provider value={{  state, dispatch, rootTree }}>
      {children}
    </TodoContext.Provider>
  );
}



export function useTodoProvider() {
  return useContext(TodoContext);
}
