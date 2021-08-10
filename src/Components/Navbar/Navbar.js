import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="todoHeading">
        <h1>Todo</h1>
      </div>
      <div>
        <Link to="/">
          <Button content="Inprogress" />
        </Link>
        <Link to="/done">
          <Button content="Done" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
