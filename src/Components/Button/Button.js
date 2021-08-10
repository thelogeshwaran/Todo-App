import React from "react";
import "./Button.css";

function Button({ content, onClick }) {
  return (
    <button className="todoButton" onClick={onClick}>
      {content}
    </button>
  );
}

export default Button;
