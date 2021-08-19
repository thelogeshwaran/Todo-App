import { observer } from "mobx-react-lite";
import React from "react";
import Todo from "../../Components/Todo/Todo";
import "./HomePage.css";
function HomePage() {
  return (
    <div className="homePage">
      <Todo />
    </div>
  );
}

export default observer(HomePage);
