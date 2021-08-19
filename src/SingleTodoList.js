import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import SingleTodo from "./SingleTodo";
import { setupRootStore } from "./Models/Setup";
import { nanoid } from "nanoid";
import TodoInputForm from "./Components/TododInputForm/TodoInputForm";
import { useTodoProvider } from "./Context/TodoProvider";


function SingleTodoList() {
    const { rootTree } = useTodoProvider();
  return (
    <div>
      {rootTree.todos.map((todo) => (
        <SingleTodo key={todo.id} item={todo} />
      ))}
    </div>
  );
}

export default observer(SingleTodoList);
