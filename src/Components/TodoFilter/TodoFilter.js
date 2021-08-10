import React from "react";
import Dropdown from "react-dropdown";
import { useTodoProvider } from "../../Context/TodoProvider/TodoProvider";
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
  const { state, dispatch } = useTodoProvider();

  return (
    <div className="filter">
      <div className="dropdown">
        <Dropdown
          options={sortOptions}
          onChange={(e) => dispatch({ type: "SORT", payload: e.value })}
          value={state.sort}
        />
      </div>
      <div className="dropdown">
        <Dropdown
          options={options}
          onChange={(e) => dispatch({ type: "FILTER", payload: e.value })}
          value={state.filter}
        />
      </div>
    </div>
  );
}

export default TodoFilter;
