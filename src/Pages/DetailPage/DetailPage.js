import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase/Firebase";
import "./DetailPage.css";

function DetailPage() {
  const { todoId, userId } = useParams();
  const [ todo, setTodo ] = useState("")
  useEffect(() => {
    db.collection("Todos")
    .doc(userId)
    .collection("todos")
      .doc(todoId)
      .get()
      .then((doc) => {
        setTodo(doc.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [todoId,userId]);
  
  return (
    <div className="details">
      <div>
        <h1 className="detail__content"><span>Todo</span> : {todo?.todo}</h1>
        <h2 className="detail__content"><span>Status</span> : {todo?.status}</h2>
        <h2 className="detail__content"><span>Priority</span> : {todo?.priority}</h2>
      </div>
    </div>
  );
}

export default observer(DetailPage);
