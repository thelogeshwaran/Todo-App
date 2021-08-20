import React, {
  useContext,
  createContext,
  useEffect
} from "react";
import { useAuthProvider } from "./AuthProvider";
import { setupRootStore } from "../Models/Setup";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { currentUser } = useAuthProvider();
  const { rootTree } = setupRootStore();

  useEffect(() => {
    currentUser && rootTree.fetchTodos(currentUser.uid);
  }, [currentUser,rootTree]);

  
  return (
    <TodoContext.Provider value={{ rootTree }}>
      {children}
    </TodoContext.Provider>
  );
}



export function useTodoProvider() {
  return useContext(TodoContext);
}
