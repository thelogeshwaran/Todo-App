import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TodoProvider } from "./Context/TodoProvider";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
