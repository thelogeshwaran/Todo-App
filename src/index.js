import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TodoProvider } from "./Context/TodoProvider/TodoProvider";
import {BrowserRouter}  from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <TodoProvider>
      <App />
    </TodoProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

