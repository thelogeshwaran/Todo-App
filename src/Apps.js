import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useTodoProvider } from "./Context/TodoProvider";
import { setupRootStore } from "./Models/Setup";
import SingleTodoList from "./SingleTodoList";

function App(){
  return(
    <div>
      {
        <div>
          <SingleTodoList/>
          </div>
      }
    </div>
  )
}

export default observer(App);