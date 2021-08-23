import React from "react";
import { useTodoProvider } from "../../Context/TodoProvider";
import TodoList from "../../Components/TodoList/TodoList";
import TodoFilter from "../../Components/TodoFilter/TodoFilter";
import { observer } from "mobx-react-lite";

function DonePage() {
  const { rootTree } = useTodoProvider();
  const filtered = rootTree.filteredData();
  const tempdata = filtered.filter((item) => item.status === "Done");
  return (
    <div>
      <div className="heading">
        <h1>Done</h1>
        <TodoFilter />
      </div>
      <TodoList data={tempdata} />
    </div>
  );
}

export default observer(DonePage);
