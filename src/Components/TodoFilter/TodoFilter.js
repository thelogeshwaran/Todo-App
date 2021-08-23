import React from "react";
import Dropdown from "react-dropdown";
import { useTodoProvider } from "../../Context/TodoProvider";
import { observer } from "mobx-react-lite";
import "./TodoFilter.css";


function TodoFilter() {
  const options = ["All", "low", "medium", "high"];
  const sortOptions = [
    "None",
    "A to Z",
    "Z to A",
    "High to Low",
    "Low to High",
  ];
  const { rootTree } = useTodoProvider();
 

  return (
    <div className="filter">
      <div className="dropdown">
        <Dropdown
          options={sortOptions}
          onChange={(e) => rootTree.setSort(e.value)}
          value={rootTree.sort}
        />
      </div>
      <div className="dropdown">
        <Dropdown
          options={options}
          onChange={(e) => rootTree.setFilter(e.value) }
          value={rootTree.filter}
        />
      </div>
    </div>
  );
}

export default observer(TodoFilter);
