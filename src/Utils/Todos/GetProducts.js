import { filterData } from "./FilterData";
import { sortData } from "./SortData";

export function getTodos(stateValue) {
  const filteredTodos = filterData(stateValue.data, stateValue.filter);
  const sortedTodos = sortData(filteredTodos, stateValue.sort);
  return sortedTodos;
}

