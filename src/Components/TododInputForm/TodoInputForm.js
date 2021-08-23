import React, { useState } from "react";
import "./TodoInputForm.css";
import Button from "../Button/Button";
import { observer } from "mobx-react-lite";

function TodoInputForm({ onSubmitTodo, placeholder, value, buttonValue }) {
  const [inputTodo, setInputTodo] = useState(value);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitTodo(inputTodo);
          setInputTodo("");
        }}
      >
        <div className="inputContent">
          <div className="todoInput">
            <input
              value={inputTodo}
              placeholder={placeholder}
              onChange={(e) => setInputTodo(e.target.value)}
            ></input>
          </div>
          <Button content={buttonValue} />
        </div>
      </form>
    </div>
  );
}

export default observer(TodoInputForm);
