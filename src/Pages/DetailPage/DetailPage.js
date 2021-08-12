import React from "react";
import { useParams } from "react-router-dom";
import { useTodoProvider } from "../../Context/TodoProvider/TodoProvider";

function DetailPage() {
  const { todoId } = useParams();
  const { data } = useTodoProvider();
  const todo = data.filter((item) => item.id === todoId);
  return (
    <div>
      <div>
        <h1>Todo : {todo[0]?.todo}</h1>
        <h2>Status : {todo[0]?.status}</h2>
        <h2>Priority : {todo[0]?.priority}</h2>
      </div>
    </div>
  );
}

export default DetailPage;
