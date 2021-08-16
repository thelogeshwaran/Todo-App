import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase/Firebase";

function DetailPage() {
  const { todoId } = useParams();
  const [ todo, setTodo ] = useState("")
  useEffect(() => {
    db.collection("Todos")
      .doc(todoId)
      .get()
      .then((doc) => {
        setTodo(doc.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <div>
      <div>
        <h1>Todo : {todo?.todo}</h1>
        <h2>Status : {todo?.status}</h2>
        <h2>Priority : {todo?.priority}</h2>
      </div>
    </div>
  );
}

export default DetailPage;
