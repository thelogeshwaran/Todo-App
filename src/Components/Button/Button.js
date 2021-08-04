import React from "react";
import "./Button.css"

function Button({content}){
    return(
        <div className="todoButton">
            <button>{content}</button>
        </div>
    )
}

export default Button;