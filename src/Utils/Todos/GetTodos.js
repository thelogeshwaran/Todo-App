import { filterData } from "./FilterData";
import { sortData } from "./SortData";

export default function getTodos(root) {
  const filteredTodos = filterData(root.todos, root.filter);
  const sortedTodos = sortData(filteredTodos, root.sort);
  return sortedTodos;
}

