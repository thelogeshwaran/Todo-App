import React from "react";
import "./Button.css";

function Button({ content, onClick, disabled }) {
  return (
    <button className="todoButton" onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

export default Button;
