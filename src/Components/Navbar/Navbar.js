import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";
import { useAuthProvider } from "../../Context/AuthProvider";

function Navbar() {
  const { logout, currentUser } = useAuthProvider();
  return (
    <div className="navbar">
      <div className="todoHeading">
        <h1>Todo</h1>
      </div>
      {
        currentUser &&
        <div>
        <Link to="/">
          <Button content="Inprogress" />
        </Link>
        <Link to="/done">
          <Button content="Done" />
        </Link>
        <Button content="Logout" onClick={logout}/>
      </div>
      }
    </div>
  );
}

export default Navbar;
